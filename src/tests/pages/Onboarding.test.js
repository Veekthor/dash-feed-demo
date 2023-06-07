import renderer from "react-test-renderer";
import OnboardingPage from "../../pages/OnboardingPage";
import { MemoryRouter } from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../context/authContext";
import { loginResponse } from "../fixtures/loginResponse";

const OnboardingPageWithRouter = ({ path }) => (
  <MemoryRouter initialEntries={[path]}>
    <OnboardingPage />
  </MemoryRouter>
);
describe("Onboarding Tests", () => {
  const localStore = {};
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

  describe("/login", () => {
    it("should match snapshots", () => {
      const component = renderer.create(
        <OnboardingPageWithRouter path="/login" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should log user in", async () => {
      fetchMock.resetMocks();
      fetchMock.mockResponseOnce(JSON.stringify(loginResponse));
      const setUser = jest.fn();
      const {TEST_LOGIN_PWORD, TEST_LOGIN_EMAIL} = process.env;
      act(() => {
        render(
          <AuthContext.Provider value={{ setUser }}>
            <OnboardingPageWithRouter path="/login" />
          </AuthContext.Provider>
        );
      });
      let input = screen.getByLabelText(/university email/i);
      act(() => userEvent.type(input, TEST_LOGIN_EMAIL));
      input = screen.getByLabelText(/Enter a password/i);
      act(() => userEvent.type(input, TEST_LOGIN_PWORD));
      const submitBtn = screen.getByTestId(/loginBtn/i);
      act(() => userEvent.click(submitBtn));
      await waitFor(() => expect(setUser).toHaveBeenCalled());
      expect(setUser).toHaveBeenCalledWith(loginResponse.user);
      expect(fetch).toHaveBeenCalled();
      expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
        "userDetails",
        JSON.stringify(loginResponse.user)
      );
      expect(global.Storage.prototype.setItem).toHaveBeenCalledWith(
        "token",
        loginResponse.token
      );
    });
  });

  describe("/register", () => {
    it("should match snapshots", () => {
      const component = renderer.create(
        <OnboardingPageWithRouter path="/register" />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should navigate to login page", () => {
      act(() => {
        render(<OnboardingPageWithRouter path="/register" />);
      });
      let input = screen.getByLabelText(/Enter your university email/i);
      act(() => {
        userEvent.type(input, "chuka@cc");
        input = screen.getByText(/Next/i);
        userEvent.click(input);
      });
      const element = screen.getByText("Login");
      expect(element).toBeInTheDocument();
    });
  });
});
