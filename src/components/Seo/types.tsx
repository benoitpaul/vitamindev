export interface JsonLdThing {
  '@context': 'https://schema.org';
  '@type': string;
  '@id': string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  mainEntityOfPage?: string | JsonLdCreativeWork;
}

export interface JsonLdPerson extends JsonLdThing {
  // givenName: string;
  // familyName: string;
  email: string;
}

export interface JsonLdOrganization extends JsonLdThing {
  logo?: string;
}

export interface JsonLdCreativeWork extends JsonLdThing {
  headline: string;
  datePublished?: Date;
  dateModified?: Date;
  author?: (JsonLdPerson | JsonLdOrganization)[];
  publisher?: JsonLdPerson | JsonLdOrganization;
  hasPart?: JsonLdCreativeWork[];
  mainEntity?: JsonLdThing;
}

export interface JsonLdWebPage extends JsonLdCreativeWork {
  breadcrumb?: JsonLdBreadcrumbList;
}

export interface JsonLdBlogPosting extends JsonLdCreativeWork {
  articleSection?: string;
  articleBody?: string;
  wordCount?: number;
  timeRequired?: string;
}

// export type JsonLdProfilePage = {
//   '@context': 'http://schema.org';
//   '@type': 'ProfilePage';
//   '@id': string;
//   mainEntity: JsonLdPerson;
// };

export interface JsonLdBreadcrumbListItem extends JsonLdThing {
  position: number;
  item: string;
}

export interface JsonLdBreadcrumbList extends JsonLdThing {
  itemListElement: JsonLdBreadcrumbListItem[];
}
