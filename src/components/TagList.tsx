import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

interface TagListProps {
  tags: string[];
}

const ListStyled = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  padding: 0.5em 1em;

  border-radius: 8px;

  background-color: var(--color-text);
  color: var(--color-background);

  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }
`;

const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <ListStyled>
      {tags.map((tag) => (
        <li key={tag}>
          <LinkStyled to={`/tags/${tag}`}>{tag}</LinkStyled>
        </li>
      ))}
    </ListStyled>
  );
};

export default TagList;
