import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
      'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px;
    min-height: 100vh;
    background: #000000;
  }

  #root {
    min-height: 100vh;
    background: #000000;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #333333 #000000;
  }

  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #000000;
  }

  *::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 6px;
    border: 3px solid #000000;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }

  *::-webkit-scrollbar-corner {
    background: #000000;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;

export default GlobalStyle;
