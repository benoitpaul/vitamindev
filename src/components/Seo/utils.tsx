import removeMd from 'remove-markdown';
import { Author, BlogPost, Category, SiteMetadata } from '../types';
import {
  JsonLdPerson,
  JsonLdBlogPosting,
  JsonLdOrganization,
  JsonLdWebPage,
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
    '@id': `${siteUrl}#Organization`,
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
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${author.canonicalUrl}#Person`,
    name: author.name,
    // givenName: string;
    // familyName: string;
    email: author.email,
    url: author.canonicalUrl,
    description: removeMd(author.descriptionExcerpt),
    sameAs: [
      author.homepageUrl,
      author.twitterUrl,
      author.linkedInUrl,
      author.facebookUrl,
    ].filter(Boolean) as string[],
  };
  return jsonLdPerson;
};

// export const createJsonLdProfilePageMetadata = (
//   jsonLdPerson: JsonLdPerson
// ): JsonLdWebPage => {
//   const jsonLdProfilePage: JsonLdWebPage = {
//     '@context': 'http://schema.org',
//     '@type': 'ProfilePage',
//     '@id': `${jsonLdPerson.url}#ProfilePage`,
//     mainEntity: jsonLdPerson,
//   };
//   return jsonLdProfilePage;
// };

export const createJsonLdBlogPostingMetadata = (
  blogPost: BlogPost,
  siteMetadata: SiteMetadata,
  isPart = false
): JsonLdBlogPosting => {
  let jsonLd: JsonLdBlogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${blogPost.canonicalUrl}#BlogPosting`,
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
    // articleSection: blogPost.category,
    // articleBody: removeMd(blogPost.internalContent),
    // wordCount: blogPost.wordCount,
    // timeRequired: `PT${blogPost.timeToRead}M`,
  };

  if (!isPart) {
    jsonLd = {
      ...jsonLd,
      articleSection: blogPost.category,
      articleBody: removeMd(blogPost.internalContent),
      wordCount: blogPost.wordCount,
      timeRequired: `PT${blogPost.timeToRead}M`,
    };
  }
  return jsonLd;
};

export const createJsonLdCategoryMetadata = (
  category: Category,
  blogPosts: BlogPost[],
  siteMetadata: SiteMetadata
): JsonLdWebPage => {
  const jsonLd: JsonLdWebPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${category.canonicalUrl}#CollectionPage`,
    url: category.canonicalUrl,
    headline: category.name,
    name: category.name,
    description: removeMd(category.descriptionExcerpt),
    hasPart: blogPosts.map((blogPost) =>
      createJsonLdBlogPostingMetadata(blogPost, siteMetadata, true)
    ),
  };
  return jsonLd;
};
