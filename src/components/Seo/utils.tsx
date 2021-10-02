import removeMd from 'remove-markdown';
import { Author, BlogPost, SiteMetadata } from '../types';
import {
  JsonLdPerson,
  JsonLdBlogPosting,
  JsonLdProfilePage,
  JsonLdOrganization,
} from './types';

export const createJsonLdOrganizationMetadata = (
  siteMetadata: SiteMetadata
): JsonLdOrganization => {
  const {
    siteUrl,
    logoUrl,
    description,
    title,
    twitterUrl,
    youtubeUrl,
    facebookUrl,
    linkedInUrl,
  } = siteMetadata;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: siteUrl,
    name: title,
    description,
    logo: logoUrl,
    sameAs: [twitterUrl, youtubeUrl, facebookUrl, linkedInUrl].filter(
      Boolean
    ) as string[],
  };
};

export const createJsonLdPersonMetadata = (author: Author): JsonLdPerson => {
  const jsonLdPerson: JsonLdPerson = {
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
  return jsonLdPerson;
};

export const createJsonLdProfilePageMetadata = (
  jsonLdPerson: JsonLdPerson
): JsonLdProfilePage => {
  const jsonLdProfilePage: JsonLdProfilePage = {
    '@context': 'http://schema.org',
    '@type': 'ProfilePage',
    mainEntity: jsonLdPerson,
  };
  return jsonLdProfilePage;
};

export const createJsonLdBlogPostingMetadata = (
  blogPost: BlogPost,
  siteMetadata: SiteMetadata
): JsonLdBlogPosting => {
  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    // image,
    url: blogPost.canonicalUrl,
    mainEntityOfPage: blogPost.canonicalUrl,
    headline: blogPost.title,
    name: blogPost.title,
    description: blogPost.description,
    datePublished: new Date(blogPost.publishedDate),
    dateModified: new Date(blogPost.updatedDate || blogPost.publishedDate),
    author: blogPost.authors.map((author) =>
      createJsonLdPersonMetadata(author)
    ),
    publisher: createJsonLdOrganizationMetadata(siteMetadata),
    articleSection: blogPost.category,
    articleBody: removeMd(blogPost.internalContent),
    wordCount: blogPost.wordCount,
    timeRequired: `PT${blogPost.timeToRead}M`,
  };
  return jsonLd;
};
