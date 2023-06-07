import { useContext, useEffect, useState } from "react";
import PostStatus from "../PostStatus";
import { FeedContainer } from "./index.styled";
import Post from "../Post";
import { authApiCall } from "../../../../utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/authContext";

const Feed = () => {
  const [posts, setPosts] = useState(() => []);
  const [isLoading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const path = "/posts/feed?page=1";
    const callback = (err, res) => {
      setLoading(false);
      if (err) {
        toast.error(err.response_message || "Something went wrong!");
      }
      if (res) {
        toast.success(res.response_message);
        setPosts(res.posts);
      }
    };

    authApiCall({ path, callback });
  }, []);
  return (
    <FeedContainer>
      <PostStatus />
      <section>
        {isLoading && <p className="card">Loading...</p>}
        {!isLoading && posts.length === 0 && (
          <p className="card">No Results found</p>
        )}
        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => {
            const { shared_by } = post;
            if (shared_by) {
              return (
                <Post
                  key={shared_by.post_uid}
                  post={{ user: shared_by }}
                  isShared
                >
                  <Post post={post} isChild />
                </Post>
              );
            }
            return <Post key={post.uid} post={post} />;
          })}
      </section>
    </FeedContainer>
  );
};

export default Feed;
