import { PostContainer, UserInfo } from "./index.styled";
import ProfileImg from "../../../../assets/user.png";

const Post = ({ post, isShared, isChild, children }) => {
  const { user } = post;
  const testId = !isChild ? "post-container" : "";
  const firstName = user.name.split(" ")[0];
  const avatarImg = user.profile_picture || ProfileImg;
  return (
    <PostContainer isChild={isChild} data-testid={testId} className="card">
      <UserInfo>
        <img className="avatar" src={avatarImg} alt={firstName} />
        <div>
          <p className="user_name">{user.name}</p>
          <p className="course_of_study">{user.course_of_study}</p>
        </div>
      </UserInfo>
      {isShared ? (
        children
      ) : (
        <>
          <div>
            {post.image && <img src={post.image} alt="" />}
            <p>{post.body}</p>
          </div>
          <div>
            <span>{post.likes} Likes </span>
            <span>{post.comments} Comments </span>
            <span>{post.shares} Shares</span>
          </div>
        </>
      )}
    </PostContainer>
  );
};

export default Post;
