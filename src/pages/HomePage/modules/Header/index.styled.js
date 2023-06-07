import styled from "styled-components";

export const StyledHeader = styled.header`
  background: var(--primary);
  padding: 10px 40px;

  input {
    background: inherit;
    color: white;
    padding: 8px 20px;
    border: 1px solid white;
    border-radius: 8px;

    &::placeholder {
      color: inherit;
      opacity: 1;
    }
  }
`;
