/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { FC, ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';

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
  padding: 2rem;
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

  return (
    <>
      <GlobalStyle />
      <LayoutGrid>
        <Header siteTitle={data?.site?.siteMetadata?.title || 'Title'} />
        <MainStyled>{children}</MainStyled>
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
