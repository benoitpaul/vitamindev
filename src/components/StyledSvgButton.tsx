import styled from 'styled-components';

type StyledSvgButtonSize = 'small' | 'large' | 'xlarge';

interface StyledSvgButtonProps {
  $size?: StyledSvgButtonSize;
}

const buttonSize = (size: StyledSvgButtonSize): number => {
  switch (size) {
    case 'small':
      return 24;
    case 'large':
      return 36;
    case 'xlarge':
      return 42;
    default:
      return 36;
  }
};

const SVG_BUTTON_RATIO = 0.667;

const StyledSvgButton = styled.button<StyledSvgButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => buttonSize($size || 'large')}px;
  height: ${({ $size }) => buttonSize($size || 'large')}px;

  padding: 0;

  border: none;
  background: none;
  cursor: pointer;

  &:focus {
    outline: 2px dashed var(--color-border);
  }

  &:hover {
    svg {
      transform: scale(1.1);
    }
  }

  svg {
    width: ${({ $size }) => buttonSize($size || 'large') * SVG_BUTTON_RATIO}px;
    height: ${({ $size }) => buttonSize($size || 'large') * SVG_BUTTON_RATIO}px;
    outline: none;
    transition: transform 0.2s linear;
  }
`;

export default StyledSvgButton;
