import React, { FC } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
// import IconMenu from '../icons/icon-menu.svg';
// import IconClose from '../icons/icon-close.svg';
import Hamburger from 'hamburger-react';
// import ScreenReaderOnly from './ScreenReaderOnly';
// import StyledSvgButton from './StyledSvgButton';

interface HeaderProps {
  siteTitle?: string;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

interface Categories {
  allCategory: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

interface NavStyledProps {
  isMenuOpen: boolean;
}

const NavStyled = styled.nav<NavStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.isMenuOpen ? '100vh' : 'unset')};
`;

const MenuBarStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

interface MenuStyledProps {
  isMenuOpen: boolean;
}

const MenuStyled = styled.section<MenuStyledProps>`
  flex: 1;
  width: 100%;
  border: solid 1px red;
  display: ${(props) => (props.isMenuOpen ? 'block' : 'none')};

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    a {
      display: block;
      padding: 1em 2em;
    }
  }
`;

const Header: FC<HeaderProps> = ({
  siteTitle = '',
  isMenuOpen,
  onToggleMenu,
}: HeaderProps) => {
  const {
    allCategory: { nodes: categories },
  }: Categories = useStaticQuery(graphql`
    query CategoriesQuery {
      allCategory {
        nodes {
          name
          slug
        }
      }
    }
  `);

  return (
    <header>
      <NavStyled isMenuOpen={isMenuOpen}>
        <MenuBarStyled>
          <Link to="/">{siteTitle}</Link>
          <Hamburger toggled={isMenuOpen} toggle={onToggleMenu} />
          {/* <StyledSvgButton
            type="button"
            $size="large"
            onClick={onToggleMenu}
            aria-expanded={isMenuOpen}
          >
            <>
              {isMenuOpen ? <IconClose /> : <IconMenu />}
              <ScreenReaderOnly>Click to toggle menu</ScreenReaderOnly>
            </>
          </StyledSvgButton> */}
        </MenuBarStyled>
        <MenuStyled isMenuOpen={isMenuOpen}>
          <ul>
            {categories.map(({ name, slug }) => {
              return (
                <li key={slug}>
                  <Link to={`/${slug}/`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </MenuStyled>
      </NavStyled>
    </header>
  );
};

export default Header;
