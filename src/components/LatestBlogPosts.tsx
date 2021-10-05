import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import PostList from './PostList';
import { BlogPostItem } from './types';

const LatestBlogPosts: FC = () => {
  const data: { allBlogPost: { nodes: BlogPostItem[] } } =
    useStaticQuery(graphql`
      query LatestBlogPosts {
        allBlogPost(
          filter: { publishedDate: { ne: null } }
          limit: 20
          sort: { fields: publishedDate, order: DESC }
        ) {
          nodes {
            title
            slug
            category
            timeToRead
            description
            authors {
              name
              slug
            }
            wordCount
            publishedDate
            updatedDate
          }
        }
      }
    `);

  const posts = data.allBlogPost.nodes;
  return <PostList posts={posts} />;
};

export default LatestBlogPosts;
