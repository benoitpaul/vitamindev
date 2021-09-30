export interface Author {
  name: string;
  slug: string;
  email: string;
  canonicalUrl: string;
  homepageUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
}

export interface BlogPost {
  id: string;
  canonicalUrl: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  authors: Author[];
  publishedDate: string;
  updatedDate?: string;
  timeToRead: number;
  wordCount: number;
  body: string;
  internalContent: string;
}

export type JsonLdAuthor = {
  '@type': 'Person';
  name: string;
  // givenName: string;
  // familyName: string;
  email: string;
  url: string;
  sameAs: string[];
};

export type JsonLdOrganization = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  url: string;
  name: string;
  description: string;
  logo: string;
};

export type JsonLdBlogPosting = {
  // '@context': 'http://schema.org';
  // '@type': 'BlogPosting';
  image?: string;
  url: string;
  headline: string;
  name: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  author?: JsonLdAuthor[];
  publisher?: JsonLdOrganization;
  articleSection: string;
  articleBody: string;
  wordCount?: number;
  timeRequired?: string;
};
