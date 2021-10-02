import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { createJsonLdOrganizationMetadata } from './utils';

const OrganizationSchemaMarkup: FC = () => {
  const siteMetadata = useSiteMetadata();

  const organizationJsonLd = createJsonLdOrganizationMetadata(siteMetadata);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
      </Helmet>
    </>
  );
};

export default OrganizationSchemaMarkup;
