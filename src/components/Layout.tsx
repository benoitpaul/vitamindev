import React, { FC, ReactNode, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';
import SkipLink from './SkipLink';

interface LayoutProps {
  children: ReactNode;
}

interface SiteProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const LayoutGrid = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
`;

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledFooter = styled.footer`
  padding: 2em 1em;

  font-size: 1rem;
  text-align: center;
  background: var(--color-secondary-900);
  color: white;

  .copyright {
    margin-bottom: 1em;
  }
  a {
    color: white;
  }
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  const data: SiteProps = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fullYear = new Date().getFullYear().toString();

  return (
    <>
      <GlobalStyle />
      <LayoutGrid>
        <SkipLink contentId="#main-content" />
        <Header
          siteTitle={data?.site?.siteMetadata?.title || 'Title'}
          isMenuOpen={isMenuOpen}
          onToggleMenu={handleToggleMenu}
        />

        <StyledMain id="main-content" tabIndex={-1}>
          {children}
        </StyledMain>
        <StyledFooter>
          <section className="copyright">
            ©<time dateTime={fullYear}>{fullYear}</time> Vitamin Dev
          </section>
          <a href="https://www.benoitpaul.com">Benoit Paul</a>
        </StyledFooter>
      </LayoutGrid>
    </>
  );
};

export default Layout;
