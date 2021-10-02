import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { BlogPost } from '../types';
import { createJsonLdBlogPostingMetadata } from './utils';

interface BlogPostingSchemaMarkupProps {
  blogPost: BlogPost;
}

const BlogPostingSchemaMarkup: FC<BlogPostingSchemaMarkupProps> = ({
  blogPost,
}) => {
  const siteMetadata = useSiteMetadata();
  const jsonLd = createJsonLdBlogPostingMetadata(blogPost, siteMetadata);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default BlogPostingSchemaMarkup;
