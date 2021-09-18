import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface Author {
  name: string;
  slug: string;
  email: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  authors: Author[];
  body: string;
}

interface BlogPostProps {
  data: {
    blogPost: BlogPost;
  };
}

const BlogPost: FC<BlogPostProps> = ({ data }) => {
  console.log('title:', data.blogPost.title);
  return (
    <>
      <h1>{data.blogPost.title}</h1>
      <ul>
        {data.blogPost?.authors?.map((author) => (
          <li key={author.slug}>
            {author.name}: {author.email}
          </li>
        ))}
      </ul>
      <MDXRenderer>{data.blogPost.body}</MDXRenderer>
    </>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      authors {
        email
        name
        slug
      }
      body
      slug
      title
    }
  }
`;

export default BlogPost;
