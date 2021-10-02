import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Author } from '../types';
import {
  createJsonLdPersonMetadata,
  createJsonLdProfilePageMetadata,
} from './utils';

interface PersonSchemaMarkupProps {
  author: Author;
  withProfilePage?: boolean;
}

const PersonSchemaMarkup: FC<PersonSchemaMarkupProps> = ({
  author,
  withProfilePage,
}) => {
  const jsonLdPerson = createJsonLdPersonMetadata(author);
  const jsonldProfilePage = createJsonLdProfilePageMetadata(jsonLdPerson);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(withProfilePage ? jsonldProfilePage : jsonLdPerson)}
        </script>
      </Helmet>
    </>
  );
};

export default PersonSchemaMarkup;
