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

export interface Person {
  name: string;
  slug: string;
  email: string;
  canonicalUrl: string;
  homepageUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  facebookUrl?: string;
  description: string;
  descriptionExcerpt: string;
}

export type Author = Omit<Person, 'bio'>;

export interface Category {
  name: string;
  slug: string;
  canonicalUrl: string;
  description: string;
  descriptionExcerpt: string;
}

export interface BlogPost {
  id: string;
  canonicalUrl: string;
  title: string;
  slug: string;
  description: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
  authors: Author[];
  publishedDate: string;
  updatedDate?: string;
  timeToRead: number;
  wordCount: number;
  body: string;
  internalContent: string;
}

// export interface BlogPostItem {
//   canonicalUrl: string;
//   title: string;
//   slug: string;
//   category: string;
//   timeToRead: number;
//   wordCount: number;
//   description: string;
//   publishedDate: string;
//   updatedDate?: string;
//   authors: {
//     name: string;
//     slug: string;
//   }[];
// }

// export interface BlogPostItemCollection {
//   name: string;
//   canonicalUrl: string;
//   description: string;
//   items: BlogPostItem[];
// }
