import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import removeMd from 'remove-markdown';
import { Author, BlogPost, JsonLdBlogPosting, JsonLdAuthor } from '../types';

interface BlogPostingSchemaMarkupProps {
  blogPost: BlogPost;
}

const createJsonLdAuthor = (author: Author): JsonLdAuthor => {
  const jsonLdAuthor: JsonLdAuthor = {
    '@type': 'Person',
    name: author.name,
    // givenName: string;
    // familyName: string;
    email: author.email,
    url: author.canonicalUrl,
    sameAs: [
      author.homepageUrl,
      author.twitterUrl,
      author.linkedInUrl,
      author.facebookUrl,
    ].filter(Boolean) as string[],
  };
  return jsonLdAuthor;
};

const createJsonLdBlogPostingMetadata = (
  blogPost: BlogPost
): JsonLdBlogPosting => {
  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    // image,
    url: blogPost.canonicalUrl,
    headline: blogPost.title,
    name: blogPost.title,
    description: blogPost.description,
    datePublished: new Date(blogPost.publishedDate),
    dateModified: new Date(blogPost.updatedDate || blogPost.publishedDate),
    author: blogPost.authors.map((author) => createJsonLdAuthor(author)),
    // publisher: JsonLdOrganization,
    articleSection: blogPost.category,
    articleBody: removeMd(blogPost.internalContent),
    wordCount: blogPost.wordCount,
    timeRequired: `PT${blogPost.timeToRead}M`,
  };
  return jsonLd;
};

const BlogPostingSchemaMarkup: FC<BlogPostingSchemaMarkupProps> = ({
  blogPost,
}) => {
  const jsonLd = createJsonLdBlogPostingMetadata(blogPost);
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default BlogPostingSchemaMarkup;
