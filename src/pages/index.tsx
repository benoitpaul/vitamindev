import React, { FC } from 'react';

import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import OrganizationSchemaMarkup from '../components/Seo/OrganizationSchemaMarkup';
import LatestBlogPosts from '../components/LatestBlogPosts';

const StyledLatestPostsSection = styled.section`
  padding: 2em 1em;
  background: var(--color-background-02);
`;

const IndexPage: FC<void> = () => (
  <Layout>
    <Seo title="Home" />
    <OrganizationSchemaMarkup />
    <StyledLatestPostsSection>
      <div className="container">
        <h1>Latest posts</h1>
        <LatestBlogPosts />
      </div>
    </StyledLatestPostsSection>
  </Layout>
);

export default IndexPage;
