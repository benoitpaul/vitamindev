import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import TagList from '../components/TagList';
import BlogPostingSchemaMarkup from '../components/Seo/BlogPostingSchemaMarkup';
import { BlogPost } from '../components/types';

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

const ArticleStyled = styled.article`
  width: 100%;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const PostInfoSectionStyled = styled.section`
  display: flex;
  font-size: 0.75rem;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    gap: 0.25em;
  }
`;

const AuthorsListStyled = styled.ul`
  display: flex;
  margin: 0;
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
    timeToRead,
    wordCount,
    body,
  } = data.blogPost;
  const postDate = updatedDate || publishedDate;
  return (
    <Layout>
      <Seo title={title} description={description} />
      <BlogPostingSchemaMarkup blogPost={data.blogPost} />

      <ArticleStyled>
        <h1>{title}</h1>
        <PostInfoSectionStyled>
          <div className="left">
            <AuthorsListStyled>
              {authors?.map((author: Author) => (
                <li key={author.slug}>
                  <Link to={`/author/${author.slug}/`}>{author.name}</Link>
                </li>
              ))}
            </AuthorsListStyled>
            /<time dateTime={postDate}>{postDate}</time>
          </div>
          <div className="right">
            <div>
              <time dateTime={`PM${timeToRead}`}>{timeToRead}</time> min read
            </div>
            &#8226;
            <div>{wordCount} words</div>
          </div>
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
      category
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
