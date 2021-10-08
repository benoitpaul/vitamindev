import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { BlogPost } from '../types';
import { JsonLdBlogPosting } from './types';
import {
  createJsonLdBlogPostingMetadata,
  createJsonLdBreadcrumbListMetadata,
  createJsonLdWebPageBlogPostingMetadata,
} from './utils';

interface BlogPostingSchemaMarkupProps {
  blogPost: BlogPost;
}

const BlogPostingSchemaMarkup: FC<BlogPostingSchemaMarkupProps> = ({
  blogPost,
}) => {
  const siteMetadata = useSiteMetadata();
  const jsonLdBlogPosting: JsonLdBlogPosting = createJsonLdBlogPostingMetadata(
    blogPost,
    siteMetadata
  );
  const jsonLdBreadcrumb = createJsonLdBreadcrumbListMetadata(
    blogPost,
    siteMetadata
  );
  const jsonLd = createJsonLdWebPageBlogPostingMetadata(
    jsonLdBlogPosting,
    jsonLdBreadcrumb
  );
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default BlogPostingSchemaMarkup;
