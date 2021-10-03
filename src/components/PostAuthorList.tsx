import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Author } from './types';

type AuthorItem = Pick<Author, 'name' | 'slug'>;

interface PostAuthorListProps {
  authors: AuthorItem[];
}

const ListStyled = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  li {
    list-style-type: none;
  }
`;

const PostAuthorList: FC<PostAuthorListProps> = ({ authors }) => {
  return (
    <ListStyled>
      {authors?.map((author) => (
        <li key={author.slug}>
          <Link to={`/author/${author.slug}/`}>{author.name}</Link>
        </li>
      ))}
    </ListStyled>
  );
};

export default PostAuthorList;
