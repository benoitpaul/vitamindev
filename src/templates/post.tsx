import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import TagList from '../components/TagList';

interface Author {
  name: string;
  slug: string;
  email: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  authors: Author[];
  publishedDate: string;
  updatedDate?: string;
  body: string;
}

interface BlogPostTemplateProps {
  data: {
    blogPost: BlogPost;
  };
}

const ArticleStyled = styled.article`
  width: 100%;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const PostInfoSectionStyled = styled.section`
  display: flex;
  font-size: 0.75rem;
`;

const AuthorsListStyled = styled.ul`
  display: flex;
  margin: 0 1em 0 0;
  padding: 0;
  li {
    list-style-type: none;
  }
`;

const BlogPostTemplate: FC<BlogPostTemplateProps> = ({ data }) => {
  const {
    title,
    description,
    tags,
    authors,
    publishedDate,
    updatedDate,
    body,
  } = data.blogPost;
  return (
    <Layout>
      <Seo title={title} description={description} />
      <ArticleStyled>
        <h1>{title}</h1>
        <PostInfoSectionStyled>
          <AuthorsListStyled>
            {authors?.map((author: Author) => (
              <li key={author.slug}>
                <Link to={`/authors/${author.slug}/`}>{author.name}</Link>
              </li>
            ))}
          </AuthorsListStyled>
          <time>{updatedDate || publishedDate}</time>
        </PostInfoSectionStyled>
        <MDXRenderer>{body}</MDXRenderer>
        <TagList tags={tags} />
      </ArticleStyled>
    </Layout>
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
      description
      category
      tags
      publishedDate(formatString: "MMMM DD,YYYY")
      updatedDate(formatString: "MMMM DD,YYYY")
    }
  }
`;

export default BlogPostTemplate;
