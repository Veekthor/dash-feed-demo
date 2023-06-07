import renderer from "react-test-renderer";
import HomePage from "../../pages/HomePage";
import { loginResponse } from "../fixtures/loginResponse";
import { render, screen, waitFor } from "@testing-library/react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import postsResponse from "../fixtures/postsResponse";
import { act } from "react-dom/test-utils";
describe("HomePage Tests", () => {
  const localStore = {
    userDetails: JSON.stringify(loginResponse.user),
    token: process.env.TEST_ACCESS_TOKEN,
  };
  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      localStore[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => localStore[key]);
  });

  afterAll(() => {
    global.Storage.prototype.setItem.mockReset();
    global.Storage.prototype.getItem.mockReset();
    fetchMock.resetMocks();
  });

  it("should match snapshots", () => {
    const component = renderer.create(<HomePage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should fetch posts", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(postsResponse));
    const expectedUrl =
      process.env.REACT_APP_API_BASE_URL + "/posts/feed?page=1";
    const expectedOptions = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    };
    act(() => {
      render(
        <AuthContext.Provider value={{ user: loginResponse.user }}>
          <MemoryRouter initialEntries={["/feed"]}>
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);

    const posts = screen.getAllByTestId("post-container");
    expect(posts).toHaveLength(postsResponse.posts.length);
  });
});
