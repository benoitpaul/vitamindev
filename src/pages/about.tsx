import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import AboutPageSchemaMarkup from '../components/Seo/AboutPageSchemaMarkup';

const StyledLatestPostsSection = styled.section`
  padding: 2em 1em;
  background: var(--color-background-01);
`;

const AboutPage: FC<PageProps> = ({ location }) => (
  <Layout>
    <Seo title="About" />
    <AboutPageSchemaMarkup location={location} />
    <StyledLatestPostsSection>
      <div className="container">
        <h1>About</h1>
        <p>
          <Link to="/">VitaminDev</Link> is a web development blog that provides
          tutorials, techniques and code snippets. They are simple, easy to use
          and understand.
        </p>
        <p>
          The web is an innovating world. The pace of new techniques to build
          and improve websites keeps on accelerating. Our goal at VitaminDev is
          to share some of that knowledge.
        </p>
        <p>
          VitaminDev is maintained by{' '}
          <Link to="/author/benoit-paul">Benoit Paul</Link>.
        </p>
      </div>
    </StyledLatestPostsSection>
  </Layout>
);

export default AboutPage;
