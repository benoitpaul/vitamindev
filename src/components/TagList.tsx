import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

interface TagListProps {
  tags: string[];
}

const StyledList = styled.ul`
  display: flex;
  gap: 0.75em;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;

  font-size: 1rem;

  list-style-type: none;
`;

const StyledLink = styled(Link)`
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
    <StyledList>
      {tags.map((tag) => (
        <li key={tag}>
          <StyledLink to={`/tags/${tag}`}>{tag}</StyledLink>
        </li>
      ))}
    </StyledList>
  );
};

export default TagList;
