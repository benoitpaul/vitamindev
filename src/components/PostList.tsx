import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import PostAuthorList from './PostAuthorList';
import { BlogPost } from './types';

interface PostListProps {
  posts: BlogPost[];
  hideCategory?: boolean;
}

const StyledList = styled.ul`
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
    padding: 2em;
    border-radius: 8px;

    background: var(--color-background-01);

    font-size: 1rem;
  }

  a.heading-link {
    text-decoration: none;
    box-shadow: none;

    &:hover {
      color: var(--color-link);

      h2 {
        color: inherit;
      }
    }
  }

  .category a {
    display: inline-block;
    margin-bottom: 0.5em;
  }

  .post-info {
    display: flex;
    gap: 0.25em;

    font-size: 0.75rem;
  }
`;

const PostList: FC<PostListProps> = ({ posts, hideCategory }) => {
  return (
    <StyledList>
      {posts?.map((post) => {
        const postDate = post.updatedDate || post.publishedDate;
        return (
          <li key={post.slug}>
            <article>
              {!hideCategory && (
                <section className="category">
                  <Link to={`/${post.categorySlug}/`}>{post.categoryName}</Link>
                </section>
              )}
              <Link
                className="heading-link"
                to={`/${post.categorySlug}/${post.slug}/`}
              >
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <section className="post-info">
                <PostAuthorList authors={post.authors} />/
                <time dateTime={postDate}>{postDate}</time>
              </section>
            </article>
          </li>
        );
      })}
    </StyledList>
  );
};

export default PostList;
