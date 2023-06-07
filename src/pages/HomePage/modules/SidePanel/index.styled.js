import styled from "styled-components";

export const SidePanelNav = styled.nav`
  background-color: white;
  padding: 10px 30px;

  ul {
    list-style: none;

    li {
      padding: 10px 30px;
      margin: 10px 0;
      border-radius: 7px;
      cursor: pointer;

      &:hover:not(.active) {
        color: var(--primary);
      }

      &.active {
        background: var(--primary);
        color: white;
      }
    }
  }
`;
