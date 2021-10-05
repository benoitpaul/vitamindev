import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-yellow-50: #FFFBEA;
    --color-yellow-100: #FFF3C4;
    --color-yellow-200: #FCE588;
    --color-yellow-300: #FADB5F;
    --color-yellow-400: #F7C948;
    --color-yellow-500: #F0B429;
    --color-yellow-600: #DE911D;
    --color-yellow-700: #CB6E17;
    --color-yellow-800: #B44D12;
    --color-yellow-900: #8D2B0B;

    --color-blue-vivid-50: #E3F8FF;
    --color-blue-vivid-100: #B3ECFF;
    --color-blue-vivid-200: #81DEFD;
    --color-blue-vivid-300: #5ED0FA;
    --color-blue-vivid-400: #40C3F7;
    --color-blue-vivid-500: #2BB0ED;
    --color-blue-vivid-600: #1992D4;
    --color-blue-vivid-700: #127FBF;
    --color-blue-vivid-800: #0B69A3;
    --color-blue-vivid-900: #035388;

    --color-grey-50: #F7F7F7;
    --color-grey-100: #E1E1E1;
    --color-grey-200: #CFCFCF;
    --color-grey-300: #B1B1B1;
    --color-grey-400: #9E9E9E;
    --color-grey-500: #7E7E7E;
    --color-grey-600: #626262;
    --color-grey-700: #515151;
    --color-grey-800: #3B3B3B;
    --color-grey-900: #222222;


    --color-primary-50: var(--color-yellow-50);
    --color-primary-100: var(--color-yellow-100);
    --color-primary-200: var(--color-yellow-200);
    --color-primary-300: var(--color-yellow-300);
    --color-primary-400: var(--color-yellow-400);
    --color-primary-500: var(--color-yellow-500);
    --color-primary-600: var(--color-yellow-600);
    --color-primary-700: var(--color-yellow-700);
    --color-primary-800: var(--color-yellow-800);
    --color-primary-900: var(--color-yellow-900);

    --color-secondary-50: var(--color-blue-vivid-50);
    --color-secondary-100: var(--color-blue-vivid-100);
    --color-secondary-200: var(--color-blue-vivid-200);
    --color-secondary-300: var(--color-blue-vivid-300);
    --color-secondary-400: var(--color-blue-vivid-400);
    --color-secondary-500: var(--color-blue-vivid-500);
    --color-secondary-600: var(--color-blue-vivid-600);
    --color-secondary-700: var(--color-blue-vivid-700);
    --color-secondary-800: var(--color-blue-vivid-800);
    --color-secondary-900: var(--color-blue-vivid-900);

    --color-neutral-50: var(--color-grey-50);
    --color-neutral-100: var(--color-grey-100);
    --color-neutral-200: var(--color-grey-200);
    --color-neutral-300: var(--color-grey-300);
    --color-neutral-400: var(--color-grey-400);
    --color-neutral-500: var(--color-grey-500);
    --color-neutral-600: var(--color-grey-600);
    --color-neutral-700: var(--color-grey-700);
    --color-neutral-800: var(--color-grey-800);
    --color-neutral-900: var(--color-grey-900);

    // design tokens here
    --color-background-01: #ffffff;
    --color-background-02: var(--color-neutral-50);
    --color-heading: var(--color-neutral-900); 
    --color-text: var(--color-neutral-800);
    --color-link: var(--color-secondary-900);
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

  a {
    color: var(--color-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      outline: currentColor dotted 2px;
      outline-offset: 2px;    
    }

    &:active {
      text-decoration: underline;
    }
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

  .container {
    width: 100%;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }


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
