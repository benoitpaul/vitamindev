import React, { FC } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { BlogPostItem } from '../components/types';
import Seo from '../components/Seo';

interface Category {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

interface BlogCategoryTemplateProps {
  data: {
    category: Category;
    allBlogPost: {
      nodes: BlogPostItem[];
    };
  };
}

const StyledCategorySection = styled.section`
  flex: 1;
  padding: 2em 1em;

  background: var(--color-background-02);
`;

const BlogCategoryTemplate: FC<BlogCategoryTemplateProps> = ({ data }) => {
  const { category } = data;
  const { nodes: posts } = data.allBlogPost;
  return (
    <Layout>
      <Seo title={category.name} description={`${category.name} posts`} />
      <StyledCategorySection>
        <div className="container">
          <div className="category-title">
            <h1>{category.name}</h1>
          </div>
          <PostList posts={posts} hideCategory />
        </div>
      </StyledCategorySection>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryAndPostsBySlug($slug: String!) {
    category(slug: { eq: $slug }) {
      name
      slug
      logoUrl
      logoImage {
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
    allBlogPost(
      filter: { category: { eq: $slug }, publishedDate: { ne: null } }
    ) {
      nodes {
        title
        slug
        category
        description
        timeToRead
        tags
        publishedDate
        updatedDate
        authors {
          name
          slug
        }
      }
    }
  }
`;

export default BlogCategoryTemplate;
