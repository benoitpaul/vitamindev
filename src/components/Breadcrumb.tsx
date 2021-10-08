import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

interface BreadcrumbProps {
  items: {
    name: string;
    path: string;
  }[];
}

const StyledBreadcrumbList = styled.ol`
  display: flex;
  gap: 0.25em;

  margin: 0;
  padding: 0;

  font-size: 1rem;
  list-style-type: none;

  li {
    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 20rem;
    }
  }

  li:not(:last-child):after {
    //content: '\\2022';
    content: '>';
    margin-left: 0.25em;
  }
`;

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <StyledBreadcrumbList>
      {items.map((item) => (
        <li key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </StyledBreadcrumbList>
  );
};

export default Breadcrumb;
