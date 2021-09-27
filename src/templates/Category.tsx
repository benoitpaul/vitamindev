import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../components/Layout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  logoImage?: IGatsbyImageData;
}

interface BlogCategoryTemplateProps {
  data: {
    category: Category;
    allBlogPost: {
      nodes: BlogPost[];
    };
  };
}

const PostListStyled = styled.ul`
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-columns: 1fr;
  gap: 2em;
  margin: 0;
  padding: 0;
  list-style-type: none;

  article {
    display: flex;
    flex-direction: column;
    padding: 2em 1em;
    border: solid 1px black;
    border-radius: 8px;

    font-size: 1rem;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BlogCategoryTemplate: FC<BlogCategoryTemplateProps> = ({ data }) => {
  const { category } = data;
  const { nodes: posts } = data.allBlogPost;
  const image = category.logoImage && getImage(category.logoImage);
  return (
    <Layout>
      {/* <Seo title={title} description={description} /> */}
      <h1>{category.name}</h1>
      <div className="logo">
        {image && <GatsbyImage image={image} alt={`${category.name} logo`} />}
        {!image && category.logoUrl && (
          <img
            src={category.logoUrl}
            height={200}
            width={200}
            alt={`${category.name} logo`}
          />
        )}
      </div>
      <PostListStyled>
        {posts?.map((post) => (
          <li key={post.slug}>
            <Link to={`/${post.category}/${post.slug}/`}>
              <article>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </article>
            </Link>
          </li>
        ))}
      </PostListStyled>
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
        tags
      }
    }
  }
`;

export default BlogCategoryTemplate;
