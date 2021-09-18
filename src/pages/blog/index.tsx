import React, { FC } from 'react';
import { graphql } from 'gatsby';

interface BlogPost {
  id: string;
  slug: string;
  body: string;
}

interface BlogPageProps {
  data: {
    allMdx: {
      nodes: BlogPost[];
    };
  };
}

const BlogPage: FC<BlogPageProps> = ({ data }) => {
  return (
    <>
      <p>My Blog</p>
      <ol>
        {data?.allMdx?.nodes?.map((blogPost) => (
          <li key={blogPost.id}>{blogPost.slug}</li>
        ))}
      </ol>
    </>
  );
};

export const query = graphql`
  query {
    allMdx {
      nodes {
        slug
        body
        id
      }
    }
  }
`;

export default BlogPage;
