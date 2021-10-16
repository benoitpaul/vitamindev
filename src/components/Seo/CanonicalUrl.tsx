import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface CanonicalUrlProps {
  url: string;
}

const CanonicalUrl: FC<CanonicalUrlProps> = ({ url }) => {
  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default CanonicalUrl;
