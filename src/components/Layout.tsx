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
`;

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
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

        <MainStyled id="main-content" tabIndex={-1}>
          {children}
        </MainStyled>
        <footer
          style={{
            marginTop: '2rem',
          }}
        >
          © {new Date().getFullYear()}, Built with{' '}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </LayoutGrid>
    </>
  );
};

export default Layout;
