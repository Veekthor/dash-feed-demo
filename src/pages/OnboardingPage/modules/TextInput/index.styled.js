import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;

  &:first-child,
  &:last-child {
    margin-top: 50px;
  }

  input {
    padding: 11px;
    padding-left: 40px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;
