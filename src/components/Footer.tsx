import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import useSiteMetadata from '../hooks/useSiteMetadata';
import StyledContainer from '../styles/StyledContainer';

const StyledFooter = styled.footer`
  padding: 2em 1em;

  font-size: 1rem;
  line-height: 1.6em;
  background: var(--color-secondary-900);
  color: var(--color-text-inverse);

  .sections {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .copyright {
    font-size: 0.75rem;
    text-align: center;
  }

  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;

    li {
      padding: 1em;
    }
  }

  a {
    color: white;
  }
`;

const Footer: FC = () => {
  const fullYear = new Date().getFullYear().toString();
  const siteMetadata = useSiteMetadata();
  return (
    <StyledFooter>
      <StyledContainer className="sections">
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <a href={siteMetadata.twitterUrl}>Twitter</a>
          </li>
          <li>
            <a href={siteMetadata.youtubeUrl}>Youtube</a>
          </li>
        </ul>
        <section className="copyright">
          ©<time dateTime={fullYear}>{fullYear}</time> Vitamin Dev. All Rights
          Reserved.
        </section>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
