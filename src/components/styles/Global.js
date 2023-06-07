import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #0472ef;
    --text-primary: #6a6a6a;
    --text-sec: #efeff1;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: var(--text-primary);
  }

`