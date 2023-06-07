import renderer from "react-test-renderer";
import Post from "../../pages/HomePage/modules/Post";
import postsResponse from "../fixtures/postsResponse";
describe("Post Component page", () => {
  it("should match snapshot", () => {
    const component = renderer.create(<Post post={postsResponse.posts[0]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Shared posts should match snapshot", () => {
    const post = postsResponse.posts[4];
    const component = renderer.create(
      <Post isShared post={{ user: post.shared_by }}>
        <Post isChild post={post} />
      </Post>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
