import removeMd from 'remove-markdown';
import { Author, BlogPost, Category, SiteMetadata } from '../types';
import {
  JsonLdPerson,
  JsonLdBlogPosting,
  JsonLdOrganization,
  JsonLdWebPage,
  JsonLdBreadcrumbList,
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
  };

  if (!isPart) {
    jsonLd = {
      ...jsonLd,
      articleSection: blogPost.categoryName,
      articleBody: removeMd(blogPost.internalContent),
      wordCount: blogPost.wordCount,
      timeRequired: `PT${blogPost.timeToRead}M`,
    };
  }
  return jsonLd;
};

export const createJsonLdBreadcrumbListMetadata = (
  blogPost: BlogPost,
  siteMetadata: SiteMetadata
): JsonLdBreadcrumbList => {
  const { canonicalUrl, title, categoryName, categorySlug } = blogPost;
  const jsonLd: JsonLdBreadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#BreadcrumbList`,
    url: canonicalUrl,
    name: `${title} BreadcrumbList`,
    itemListElement: [
      {
        '@context': 'https://schema.org',
        '@type': 'ListItem',
        '@id': `${siteMetadata.siteUrl}/#ListItem`,
        name: siteMetadata.title,
        item: `${siteMetadata.siteUrl}/`,
        position: 1,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ListItem',
        '@id': `${siteMetadata.siteUrl}/${categorySlug}/#ListItem`,
        name: categoryName,
        item: `${siteMetadata.siteUrl}/${categorySlug}/`,
        position: 2,
      },
    ],
  };
  return jsonLd;
};

export const createJsonLdWebPageBlogPostingMetadata = (
  jsonLdBLogPosting: JsonLdBlogPosting,
  breadcrumb: JsonLdBreadcrumbList
): JsonLdWebPage => {
  const { headline, name, url } = jsonLdBLogPosting;
  const jsonLd: JsonLdWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url as string}#WebPage`,
    headline,
    name,
    url,
    mainEntity: jsonLdBLogPosting,
    breadcrumb,
  };
  return jsonLd;
};

export const createJsonLdAboutPageMetadata = ({
  name,
  url,
  siteMetadata,
}: {
  name: string;
  url: string;
  siteMetadata: SiteMetadata;
}): JsonLdWebPage => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#AboutPage`,
    url,
    name,
    headline: name,
    about: createJsonLdOrganizationMetadata(siteMetadata),
  };
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
