import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { BlogPost, Category } from '../types';
import { createJsonLdCategoryMetadata } from './utils';

interface CategorySchemaMarkupProps {
  category: Category;
  blogPosts: BlogPost[];
}

const CategorySchemaMarkup: FC<CategorySchemaMarkupProps> = ({
  category,
  blogPosts,
}) => {
  const siteMetadata = useSiteMetadata();
  const jsonLd = createJsonLdCategoryMetadata(
    category,
    blogPosts,
    siteMetadata
  );
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default CategorySchemaMarkup;
