import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  border: 1px solid var(--primary);
  cursor: pointer;
  background-color: var(--primary);
  color: white;
  padding: 15px;
  font-size: 1rem;
  border-radius: 6px;
  transition: background-color 0.8s, color 0.8s;

  &:hover {
    background-color: white;
    color: var(--primary);
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;
