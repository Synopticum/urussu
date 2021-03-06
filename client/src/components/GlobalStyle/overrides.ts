import { color } from 'src/components/GlobalStyle/theme';

const overrides = `
  *, *:before, *:after { box-sizing: inherit; }

  html {
    height: 100%;
    overflow: auto;
  }

  body {
    font-family: 'PT Serif', serif;
    box-sizing: border-box;
    word-break: break-word;
    text-decoration-skip-ink: none;
    overflow: auto;
    height: 100%;
    padding: 0;
    background: var(--main-light);
    line-height: 1.4;
  }

  #main {
    min-height: 100%;
    min-width: 1200px;
    margin: 0;
    display: flex;
    flex-direction: column;
    border-radius: 5px 0 0 5px;
  }

  a {
    margin-left: 5px;
    color: ${color('blue-1')};
  }

  input, textarea, button { font-family: "PT Serif", Times New Roman, "Helvetica Neue", sans-serif; }
  input:active, textarea:active, button:active, input:focus, textarea:focus, button:focus { outline: none; }

  input,
  input:hover,
  input:focus,
  input:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  input[type=text]::-ms-clear {
    display: none;
  }
  input[type=password]::-ms-reveal {
    display: none;
  }
`;

export default overrides;
