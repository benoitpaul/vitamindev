import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
}

interface BlogCategoryTemplateProps {
  data: {
    allBlogPost: {
      nodes: BlogPost[];
    };
  };
}

const PostListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const BlogCategoryTemplate: FC<BlogCategoryTemplateProps> = ({ data }) => {
  const { nodes: posts } = data.allBlogPost;
  return (
    <Layout>
      {/* <Seo title={title} description={description} /> */}
      <PostListStyled>
        {posts?.map((post) => (
          <li key={post.slug}>
            <Link to={`/${post.category}/${post.slug}/`}>{post.title}</Link>
          </li>
        ))}
      </PostListStyled>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostsByCategory($category: String!) {
    allBlogPost(filter: { category: { eq: $category } }) {
      nodes {
        title
        slug
        category
        description
        tags
      }
    }
  }
`;

export default BlogCategoryTemplate;
