import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { createJsonLdAboutPageMetadata } from './utils';

type AboutPageSchemaMarkupProps = Pick<PageProps, 'location'>;

const AboutPageSchemaMarkup: FC<AboutPageSchemaMarkupProps> = ({
  location,
}) => {
  const siteMetadata = useSiteMetadata();
  const url = `${siteMetadata.siteUrl}${location.pathname}/`;

  const aboutPageJsonLd = createJsonLdAboutPageMetadata({
    name: `About ${siteMetadata.title}`,
    url,
    siteMetadata,
  });
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aboutPageJsonLd)}
        </script>
      </Helmet>
    </>
  );
};

export default AboutPageSchemaMarkup;
