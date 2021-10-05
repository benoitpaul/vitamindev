import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

interface TagListProps {
  tags: string[];
}

const ListStyled = styled.ul`
  display: flex;
  gap: 0.75em;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;

  font-size: 1rem;

  list-style-type: none;
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  padding: 0.5em 1em;

  border-radius: 6px;

  background-color: var(--color-secondary-50);

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
