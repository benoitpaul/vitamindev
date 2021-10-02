import React, { FC } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import OrganizationSchemaMarkup from '../components/Seo/OrganizationSchemaMarkup';

const IndexPage: FC<void> = () => (
  <Layout>
    <Seo title="Home" />
    <OrganizationSchemaMarkup />
    <h1>Software development</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>
    </p>
  </Layout>
);

export default IndexPage;
