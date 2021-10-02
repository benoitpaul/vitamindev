export type JsonLdPerson = {
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
  logo?: string;
  sameAs: string[];
};

export type JsonLdBlogPosting = {
  '@context': 'http://schema.org';
  '@type': 'BlogPosting';
  image?: string;
  url: string;
  mainEntityOfPage?: string;
  headline: string;
  name: string;
  description: string;
  datePublished: Date;
  dateModified: Date;
  author?: JsonLdPerson[];
  publisher?: JsonLdOrganization;
  articleSection: string;
  articleBody: string;
  wordCount?: number;
  timeRequired?: string;
};

export type JsonLdProfilePage = {
  '@context': 'http://schema.org';
  '@type': 'ProfilePage';
  mainEntity: JsonLdPerson;
};
