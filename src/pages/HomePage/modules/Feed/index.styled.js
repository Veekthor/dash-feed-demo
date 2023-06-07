import styled from "styled-components";

export const FeedContainer = styled.main`
  background-color: #eee;
  width: 100%;
  padding: 20px;
  min-height: 100vh;

  .card {
    background-color: white;
    box-shadow: 0px 2px 8px rgba(0,0,0,.3);
    border-radius: 8px;
    padding: 25px;
    width: 80%;
    margin: 30px auto;
    max-width: 700px;

    img.avatar {
      width: 30px;
      border-radius: 50%;
      height: 30px;
    }

    & > div {
      margin: 10px 0;
    }
  }
`