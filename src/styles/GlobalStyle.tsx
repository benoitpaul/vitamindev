import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  :root {
    // design tokens here
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
    margin: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  body {
    color: ${(props) => (props.theme === 'purple' ? 'purple' : 'white')};
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
