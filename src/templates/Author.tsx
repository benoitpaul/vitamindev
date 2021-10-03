import React, { FC, useMemo } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import { toUrl } from 'gatsby-source-gravatar';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { BlogPostItem, Person } from '../components/types';
import PersonSchemaMarkup from '../components/Seo/PersonSchemaMarkup';
import PostList from '../components/PostList';

interface AuthorTemplateProps {
  data: {
    person: Person;
    allBlogPost: {
      nodes: BlogPostItem[];
    };
  };
}

const StyledGravatar = styled.img`
  border-radius: 128px;
`;

const StyledAuthorSection = styled.section`
  display: flex;
  flex-direction: column;

  .description {
    display: flex;
    gap: 1em;
  }

  .links {
    display: flex;
    gap: 1em;

    a {
      svg {
        height: 32px;
        width: 32px;
      }
    }
  }
`;

const AuthorTemplate: FC<AuthorTemplateProps> = ({ data }) => {
  const { name, email, twitterUrl, linkedInUrl, facebookUrl, description } =
    data.person;

  const latestBlogPosts = data.allBlogPost.nodes;

  const gravatarUrl = useMemo(() => toUrl(email, 'size=128'), [email]);

  return (
    <Layout>
      <Seo title={name} description={description} />
      <PersonSchemaMarkup author={data.person} />
      <StyledAuthorSection>
        <section className="description">
          <StyledGravatar
            src={gravatarUrl}
            alt={`${name}'s gravatar`}
            width={128}
            height={128}
          />
          <article>
            <h1>{name}</h1>
            <MDXRenderer>{description}</MDXRenderer>
          </article>
        </section>
        <section className="links">
          {twitterUrl && (
            <a href={twitterUrl}>
              <FaTwitter />
            </a>
          )}
          {linkedInUrl && (
            <a href={linkedInUrl}>
              <FaLinkedin />
            </a>
          )}
          {facebookUrl && (
            <a href={facebookUrl}>
              <FaFacebook />
            </a>
          )}
        </section>
        <section className="latestPosts">
          <h2>Latest posts by {name}</h2>
          <PostList posts={latestBlogPosts} />
        </section>
      </StyledAuthorSection>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PersonBySlug($slug: String!) {
    person(slug: { eq: $slug }) {
      email
      name
      slug
      canonicalUrl
      homepageUrl
      twitterUrl
      linkedInUrl
      facebookUrl
      description
    }
    allBlogPost(
      filter: {
        authors: { elemMatch: { slug: { eq: $slug } } }
        publishedDate: { ne: null }
      }
      limit: 10
      sort: { fields: publishedDate, order: DESC }
    ) {
      nodes {
        title
        slug
        category
        timeToRead
        description
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

export default AuthorTemplate;