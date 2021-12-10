import React, { FC } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { Category, BlogPost } from '../components/types';
import Seo from '../components/Seo';
import CategorySchemaMarkup from '../components/Seo/CategorySchemaMarkup';
import CanonicalUrl from '../components/Seo/CanonicalUrl';

interface BlogCategoryTemplateProps {
  data: {
    category: Category;
    allBlogPost: {
      nodes: BlogPost[];
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
      <Seo
        title={`${category.name} posts`}
        description={category.descriptionExcerpt}
      />
      <CanonicalUrl url={category.canonicalUrl} />
      <CategorySchemaMarkup category={category} blogPosts={posts} />
      <StyledCategorySection>
        <div className="container">
          <div className="category-title">
            <h1>{category.name}</h1>
          </div>
          <MDXRenderer>{category.description}</MDXRenderer>
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
      canonicalUrl
      description
      descriptionExcerpt
      logoUrl
      logoImage {
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
    allBlogPost(
      filter: { categorySlug: { eq: $slug }, publishedDate: { ne: null } }
      sort: { fields: publishedDate, order: DESC }
    ) {
      nodes {
        authors {
          email
          name
          slug
          canonicalUrl
          homepageUrl
          twitterUrl
          linkedInUrl
          facebookUrl
        }
        body
        internalContent
        slug
        title
        description
        categoryName
        categorySlug
        tags
        # publishedDate(formatString: "MMMM DD,YYYY")
        # updatedDate(formatString: "MMMM DD,YYYY")
        publishedDate
        updatedDate
        timeToRead
        wordCount
        canonicalUrl
      }
    }
  }
`;

export default BlogCategoryTemplate;
