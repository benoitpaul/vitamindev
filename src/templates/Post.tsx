import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogPostingSchemaMarkup from '../components/Seo/BlogPostingSchemaMarkup';
import { BlogPost } from '../components/types';
import Breadcrumb from '../components/Breadcrumb';
import useSiteMetadata from '../hooks/useSiteMetadata';
import StyledContainer from '../styles/StyledContainer';

interface Author {
  name: string;
  slug: string;
  email: string;
}

interface BlogPostTemplateProps {
  data: {
    blogPost: BlogPost;
  };
}

const StyledArticle = styled.article`
  flex: 1;
  padding: 2em 1em;

  h1 {
    margin-top: 1rem;
  }

  .category a {
    display: inline-block;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }
`;

const StyledPostInfoSection = styled.section`
  display: flex;
  font-size: 0.75rem;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    gap: 0.25em;
  }
`;

const StyledAuthorsList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  li {
    list-style-type: none;
  }
`;

const BlogPostTemplate: FC<BlogPostTemplateProps> = ({ data }) => {
  const siteMetadata = useSiteMetadata();
  const {
    title,
    categorySlug,
    categoryName,
    description,
    authors,
    publishedDate,
    updatedDate,
    timeToRead,
    wordCount,
    body,
  } = data.blogPost;
  const postDate = updatedDate || publishedDate;
  const breadcrumbList = [
    {
      name: siteMetadata.title,
      path: '/',
    },
    {
      name: categoryName,
      path: `/${categorySlug}/`,
    },
  ];
  return (
    <Layout>
      <Seo title={title} description={description} />
      <BlogPostingSchemaMarkup blogPost={data.blogPost} />

      <StyledArticle>
        <StyledContainer>
          <Breadcrumb items={breadcrumbList} />
          {/* <section className="category">
          <Link to={`/${category}/`}>{category}</Link>
        </section> */}
          <h1>{title}</h1>
          <StyledPostInfoSection>
            <div className="left">
              <StyledAuthorsList>
                {authors?.map((author: Author) => (
                  <li key={author.slug}>
                    <Link to={`/author/${author.slug}/`}>{author.name}</Link>
                  </li>
                ))}
              </StyledAuthorsList>
              /<time dateTime={postDate}>{postDate}</time>
            </div>
            <div className="right">
              <div>
                <time dateTime={`PM${timeToRead}`}>{timeToRead}</time> min read
              </div>
              &#8226;
              <div>{wordCount} words</div>
            </div>
          </StyledPostInfoSection>
          <MDXRenderer>{body}</MDXRenderer>
          {/* <TagList tags={tags} /> */}
        </StyledContainer>
      </StyledArticle>
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
      categorySlug
      categoryName
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
`;

export default BlogPostTemplate;
