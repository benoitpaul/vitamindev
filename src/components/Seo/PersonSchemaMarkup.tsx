import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Author } from '../types';
import { createJsonLdPersonMetadata } from './utils';

interface PersonSchemaMarkupProps {
  author: Author;
}

const PersonSchemaMarkup: FC<PersonSchemaMarkupProps> = ({ author }) => {
  const jsonLdPerson = createJsonLdPersonMetadata(author);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdPerson)}
        </script>
      </Helmet>
    </>
  );
};

export default PersonSchemaMarkup;
