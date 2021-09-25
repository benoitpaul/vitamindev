import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  :root {
    // design tokens here
    --color-background: #ffffff;
    --color-heading: #000000;
    --color-text: #374151;
    --color-border: rgba(0,0,0,0.1);
  }

  // box-sizing rules
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  // remove default margin
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-heading);
    margin: 0;
  }

  h1 {
    font-weight: 700;
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  em,
  i {
    font-style: italic;
  }

  p {
    line-height: 1.6em;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-size: 1.125rem;
    font-family: "Inter", sans-serif;
    // color: ${(props) => (props.theme === 'purple' ? 'purple' : 'white')};
    color: var(--color-text);
  }

  /* Tables */

table {
  display: table;
  width: 100%;
  max-width: 100%;
  margin: 0 0 1.5rem;

  border-collapse: collapse;
  border-spacing: 0;

  //overflow-x: auto;
}

th {
  font-weight: 700;
}

th,
td {
  border: 1px solid var(--color-border);
  text-align: left;
  padding: 0.75rem;
  // hyphens: auto;
  word-break: break-word;
}

/* tbody tr:nth-child(odd) {
  background-color: var(--dark-opacity);
} */

  @supports (font-variation-settings: normal) {
    body {
      font-family: "InterVariable";
      font-variation-settings: "wght" 400;
    }

    h1 {
      font-family: "InterVariable", sans-serif;
      font-variation-settings: "wght" 700; 
    }

    h2, h3 {
      font-family: "InterVariable", sans-serif;
      font-variation-settings: "wght" 600; 
    }

    em,
    i {
      font-variation-settings: "slnt" -10;
      font-style: oblique 10deg;
    }

    th {
      font-family: "InterVariable", sans-serif;
      font-variation-settings: "wght" 700; 
    }
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }

    html {
      scroll-behavior: initial;
    }
  }
`;

export default GlobalStyle;
