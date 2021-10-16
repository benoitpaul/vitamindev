import { createGlobalStyle } from 'styled-components';
// import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-yellow-50: #FFFAEB;
    --color-yellow-100: #FCEFC7;
    --color-yellow-200: #F8E3A3;
    --color-yellow-300: #F9DA8B;
    --color-yellow-400: #F7D070;
    --color-yellow-500: #E9B949;
    --color-yellow-600: #C99A2E;
    --color-yellow-700: #A27C1A; 
    --color-yellow-800: #7C5E10; 
    --color-yellow-900: #513C06;

    --color-yellow-vivid-50: #FFFBEA;
    --color-yellow-vivid-100: #FFF3C4;
    --color-yellow-vivid-200: #FCE588;
    --color-yellow-vivid-300: #FADB5F;
    --color-yellow-vivid-400: #F7C948;
    --color-yellow-vivid-500: #F0B429;
    --color-yellow-vivid-600: #DE911D;
    --color-yellow-vivid-700: #CB6E17; // OK contrast for large text
    --color-yellow-vivid-800: #B44D12; // OK contrast for large and normal text
    --color-yellow-vivid-900: #8D2B0B; // OK contrast for large and normal text

    --color-blue-50: #DCEEFB;
    --color-blue-100: #B6E0FE;
    --color-blue-200: #84C5F4;
    --color-blue-300: #62B0E8;
    --color-blue-400: #4098D7; // *
    --color-blue-500: #2680C2; // * OK contrast for large text
    --color-blue-600: #186FAF; // OK contrast for large and normal text
    --color-blue-700: #0F609B; 
    --color-blue-800: #0A558C; 
    --color-blue-900: #003E6B; 

    --color-blue-vivid-50: #E3F8FF;
    --color-blue-vivid-100: #B3ECFF;
    --color-blue-vivid-200: #81DEFD;
    --color-blue-vivid-300: #5ED0FA;
    --color-blue-vivid-400: #40C3F7;
    --color-blue-vivid-500: #2BB0ED;
    --color-blue-vivid-600: #1992D4; // OK contrast for large text
    --color-blue-vivid-700: #127FBF; // OK contrast for large text
    --color-blue-vivid-800: #0B69A3; // OK contrast for large and normal text
    --color-blue-vivid-900: #035388; // OK contrast for large and normal text

    --color-green-50: #E3F9E5;
    --color-green-100: #C1EAC5;
    --color-green-200: #A3D9A5;
    --color-green-300: #7BC47F; // *
    --color-green-400: #57AE5B; // *
    --color-green-500: #3F9142;
    --color-green-600: #2F8132; 
    --color-green-700: #207227; 
    --color-green-800: #0E5814; 
    --color-green-900: #05400A;
    
    --color-red-50: #FFEEEE;
    --color-red-100: #FACDCD;
    --color-red-200: #F29B9B;
    --color-red-300: #E66A6A; // *
    --color-red-400: #D64545; // Ok contrast for large text
    --color-red-500: #BA2525; // Ok contrast for normal and large text
    --color-red-600: #A61B1B; // Ok contrast for normal and large text
    --color-red-700: #911111; 
    --color-red-800: #780A0A; 
    --color-red-900: #610404;
    
    --color-cyan-50: #E0FCFF;
    --color-cyan-100: #BEF8FD;
    --color-cyan-200: #BEF8FD;
    --color-cyan-300: #54D1DB; 
    --color-cyan-400: #38BEC9; 
    --color-cyan-500: #2CB1BC; 
    --color-cyan-600: #14919B; 
    --color-cyan-700: #0E7C86; 
    --color-cyan-800: #0A6C74; 
    --color-cyan-900: #044E54;
    
    --color-lime-green-50: #F2FDE0;
    --color-lime-green-100: #E2F7C2;
    --color-lime-green-200: #C7EA8F;
    --color-lime-green-300: #ABDB5E; 
    --color-lime-green-400: #94C843; 
    --color-lime-green-500: #7BB026; 
    --color-lime-green-600: #63921A; 
    --color-lime-green-700: #507712; 
    --color-lime-green-800: #42600C; 
    --color-lime-green-900: #2B4005; 

    --color-grey-50: #F7F7F7;
    --color-grey-100: #E1E1E1;
    --color-grey-200: #CFCFCF;
    --color-grey-300: #B1B1B1;
    --color-grey-400: #9E9E9E;
    --color-grey-500: #7E7E7E; // OK contrast for large text
    --color-grey-600: #626262; // OK contrast for large and normal text
    --color-grey-700: #515151; // OK contrast for large and normal text
    --color-grey-800: #3B3B3B; // OK contrast for large and normal text
    --color-grey-900: #222222; // OK contrast for large and normal text

    --color-blue-grey-50: #F0F4F8;
    --color-blue-grey-100: #D9E2EC;
    --color-blue-grey-200: #BCCCDC;
    --color-blue-grey-300: #9FB3C8;
    --color-blue-grey-400: #829AB1;
    --color-blue-grey-500: #627D98; 
    --color-blue-grey-600: #486581; 
    --color-blue-grey-700: #334E68; 
    --color-blue-grey-800: #243B53; 
    --color-blue-grey-900: #102A43;
    
    --color-warm-grey-50: #FAF9F7;
    --color-warm-grey-100: #E8E6E1;
    --color-warm-grey-200: #D3CEC4;
    --color-warm-grey-300: #B8B2A7;
    --color-warm-grey-400: #A39E93;
    --color-warm-grey-500: #857F72; 
    --color-warm-grey-600: #625D52; 
    --color-warm-grey-700: #504A40; 
    --color-warm-grey-800: #423D33; 
    --color-warm-grey-900: #27241D; 



    --color-primary-50: var(--color-red-50);
    --color-primary-100: var(--color-red-100);
    --color-primary-200: var(--color-red-200);
    --color-primary-300: var(--color-red-300);
    --color-primary-400: var(--color-red-400);
    --color-primary-500: var(--color-red-500);
    --color-primary-600: var(--color-red-600);
    --color-primary-700: var(--color-red-700);
    --color-primary-800: var(--color-red-800);
    --color-primary-900: var(--color-red-900);

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

    --color-neutral-50: var(--color-warm-grey-50);
    --color-neutral-100: var(--color-warm-grey-100);
    --color-neutral-200: var(--color-warm-grey-200);
    --color-neutral-300: var(--color-warm-grey-300);
    --color-neutral-400: var(--color-warm-grey-400);
    --color-neutral-500: var(--color-warm-grey-500);
    --color-neutral-600: var(--color-warm-grey-600);
    --color-neutral-700: var(--color-warm-grey-700);
    --color-neutral-800: var(--color-warm-grey-800);
    --color-neutral-900: var(--color-warm-grey-900);

    --color-green-light: #6EA370;
    --color-green-dark: #395247;
    --color-yellow: #EEB73D;
    --color-blue-dark: #006EC3;
    --color-blue-light: #E1ECF0;
    --color-red: #913633;
    --color-red-light: #B5859E;

    // design tokens here
    --color-primary: var(--color-primary-600);
    --color-background-01: #ffffff;
    --color-background-02: var(--color-neutral-50);
    --color-background-03: var(--color-primary-600);
    --color-background-code: var(--color-neutral-100);
    --color-heading: var(--color-neutral-900); 
    --color-text: var(--color-neutral-700);
    --color-text-light: var(--color-neutral-600);
    --color-text-em: var(--color-cyan-700);
    --color-text-inverse: var(--color-neutral-50);
    --color-link: var(--color-primary-600);
    --color-border: rgba(0,0,0,0.1);

    --line-height: 1.6em;
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

  em {
    color: var(--color-text-em);
  }

  p {
    line-height: var(--line-height);
  }

  a {
    color: var(--color-link);
    text-decoration: none;
    box-shadow: 0px 0px 0px currentColor;
    transition: box-shadow 400ms ease 0s;

    &:hover {
      box-shadow: 0px 2px 0px currentColor;
      transition: box-shadow 100ms ease 0s;
    }

    &:focus-visible {
      outline: currentColor dotted 3px;
    }

    &:active{
      color: var(--color-link-hover);
    }
  }

  blockquote {
    font-style: italic;
    color: var(--color-text-light);
    padding: 0 2em;
    margin-top: 2em;
    margin-bottom: 3em;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-size: 1.125rem;
    font-family: "Inter", sans-serif;
    color: var(--color-text);
    background-color: var(--color-background-01);
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

  tbody tr:nth-child(odd) {
    background-color: var(--color-background-02);
  } 

  ::selection {
    color: var(--color-text-inverse);
    background: var(--color-background-03);
  }

  ::marker {
    color: var(--color-primary);
  }

  .container {
    width: 100%;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }

  .active-menu-item {
    font-weight: 700;
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

    strong {
      font-variation-settings: "wght" 700; 
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

    .active-menu-item {
      font-family: "InterVariable", sans-serif;
        font-variation-settings: "wght" 600; 
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
