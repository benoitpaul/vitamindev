import React, { FC } from 'react';

import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import OrganizationSchemaMarkup from '../components/Seo/OrganizationSchemaMarkup';
import LatestBlogPosts from '../components/LatestBlogPosts';

// const StyledHeroSection = styled.section`
//   padding: 4em 0;

//   background: linear-gradient(
//     to top right,
//     var(--color-primary-200),
//     var(--color-primary-600)
//   );

//   h1,
//   p {
//     text-align: center;
//   }
// `;

const StyledLatestPostsSection = styled.section`
  padding: 2em 1em;
  background: var(--color-background-02);
`;

const IndexPage: FC<void> = () => (
  <Layout>
    <Seo title="Home" />
    <OrganizationSchemaMarkup />

    {/* <StyledHeroSection>
      <h1>Vitamin Dev</h1>
      <p>Your daily dose of software development goodies</p>
    </StyledHeroSection> */}
    <StyledLatestPostsSection>
      <div className="container">
        <h1>Latest posts</h1>
        <LatestBlogPosts />
      </div>
    </StyledLatestPostsSection>
  </Layout>
);

export default IndexPage;
