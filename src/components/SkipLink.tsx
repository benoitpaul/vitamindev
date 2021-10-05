import React, { FC } from 'react';
import styled from 'styled-components';

const StyledAnchor = styled.a`
  position: absolute;
  top: 32px;
  left: 32px;
  margin: 0;
  padding: 1em;

  -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  clip-path: polygon(0 0, 0 0, 0 0, 0 0);

  border-radius: 6px;

  :focus,
  :active {
    -webkit-clip-path: none;
    clip-path: none;

    z-index: 999;
    font-size: 1.2rem;
    text-decoration: underline;
    text-align: center;

    background: var(--color-secondary-900);
    color: white;
  }
`;

interface SkipLinkProps {
  contentId: string;
}

const SkipLink: FC<SkipLinkProps> = ({ contentId }) => {
  return <StyledAnchor href={contentId}>Skip to content</StyledAnchor>;
};

export default SkipLink;
