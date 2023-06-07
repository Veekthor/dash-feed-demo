import styled from "styled-components";

export const PostContainer = styled.div`
  ${({ isChild }) =>
    isChild &&
    `
    margin-left: 30px !important;
    box-shadow: none !important;
  `}
`;
export const UserInfo = styled.div`
  display: flex;
  gap: 15px;

  .user_name {
    font-weight: bold;
  }

  .course_of_study {
    font-size: 11px;
  }
`;
