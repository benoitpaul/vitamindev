export interface SiteMetadata {
  title: string;
  siteUrl: string;
  description: string;
  author: string;
  logoUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  linkedInUrl?: string;
}

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
