import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import StyledContainer from '../styles/StyledContainer';

const StyledSection = styled.section`
  padding: 2em 1em;
`;

const NotFoundPage: FC<void> = () => (
  <Layout>
    <Seo title="404: Not found" />
    <StyledContainer>
      <StyledSection>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <p>
          Use the menu or go back <Link to="/">home</Link>
        </p>
      </StyledSection>
    </StyledContainer>
  </Layout>
);

export default NotFoundPage;
