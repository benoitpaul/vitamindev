import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import PostAuthorList from './PostAuthorList';
import { BlogPostItem } from './types';

interface PostListProps {
  posts: BlogPostItem[];
}

const ListStyled = styled.ul`
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

  .category a {
    display: inline-block;
    text-transform: uppercase;
    margin-bottom: 0.25em;
  }

  .info {
    display: flex;
    gap: 0.25em;

    font-size: 0.75rem;
  }
`;

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <ListStyled>
      {posts?.map((post) => {
        const postDate = post.updatedDate || post.publishedDate;
        return (
          <li key={post.slug}>
            <article>
              <section className="category">
                <Link to={`/${post.category}/`}>{post.category}</Link>
              </section>
              <Link to={`/${post.category}/${post.slug}/`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <section className="info">
                <PostAuthorList authors={post.authors} />/
                <time dateTime={postDate}>{postDate}</time>
              </section>
            </article>
          </li>
        );
      })}
    </ListStyled>
  );
};

export default PostList;
