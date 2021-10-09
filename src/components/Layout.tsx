import React, { FC, ReactNode, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';
import SkipLink from './SkipLink';
import Footer from './Footer';

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

        <StyledMain id="main-content" tabIndex={-1}>
          {children}
        </StyledMain>
        <Footer />
      </LayoutGrid>
    </>
  );
};

export default Layout;
