import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/authContext";
import { StyledButton } from "../../../../components/styles/Button.styled";
import { toast } from "react-toastify";
import { InputContainer, PostStatusContainer } from "./index.styled";

const PostStatus = () => {
  const { user } = useContext(AuthContext);
  const [postTxt, setPostTxt] = useState("");
  const handleChange = (e) => {
    setPostTxt(e.target.value);
  };
  const handlePost = (e) => {
    toast.success("Posted: " + postTxt);
    setPostTxt("");
  };
  return (
    <PostStatusContainer className="card">
      <InputContainer className="input-container">
        <img src={user?.profile_picture} className="avatar" alt="Avatar" />
        <textarea
          value={postTxt}
          onChange={handleChange}
          placeholder="What's happening?"
        />
      </InputContainer>
      <div>
        <StyledButton disabled={!postTxt.trim()} onClick={handlePost}>
          Post
        </StyledButton>
      </div>
    </PostStatusContainer>
  );
};

export default PostStatus;
