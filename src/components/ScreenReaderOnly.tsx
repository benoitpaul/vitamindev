import React, { FC } from 'react';
import styled from 'styled-components';

const SpanStyled = styled.span`
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

const ScreenReaderOnly: FC = ({ children }) => {
  return <SpanStyled>{children}</SpanStyled>;
};

export default ScreenReaderOnly;
