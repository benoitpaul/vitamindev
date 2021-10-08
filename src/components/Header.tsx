import React, { CSSProperties, FC, useEffect } from 'react';
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

interface StyledNavProps {
  isMenuOpen: boolean;
}

const StyledNav = styled.nav<StyledNavProps>`
  position: relative;
  display: flex;

  flex-direction: column;
  min-height: ${(props) => (props.isMenuOpen ? '100vh' : 'unset')};

  background: var(--color-primary-400);
`;

const StyledMenuBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 56rem;
  width: 100%;
  margin: 0 auto;
  padding: 1em;

  color: var(--color-link);

  @media only screen and (min-width: 42rem) {
    .hamburger-react {
      display: none;
    }
  }
`;

const StyledDesktopMenu = styled.section`
  display: none;
  @media only screen and (min-width: 42rem) {
    display: block;
  }

  font-size: 1rem;

  flex: 1;
  ul {
    display: flex;
    justify-content: flex-end;
    gap: 1em;

    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

interface StyledMobileMenuProps {
  isMenuOpen: boolean;
}

const StyledMobileMenu = styled.section<StyledMobileMenuProps>`
  flex: 1;
  width: 100%;
  visibility: ${(props) => (props.isMenuOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isMenuOpen ? '1' : '0')};
  transform: translateX(${(props) => (props.isMenuOpen ? '0px' : '-1000px')});
  transition: all 0.375s;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    height: ${(props) => (props.isMenuOpen ? 'auto' : '0')};

    a {
      display: inline-block;
      padding: 1em 2em;
      opacity: ${(props) => (props.isMenuOpen ? '1' : '0')};
      transform: translateY(${(props) => (props.isMenuOpen ? '0px' : '-10px')});
      transition: all 0.275s calc(0.175s + var(--delay) * 0.05s);
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

  const remToPixels = (rem: number): number => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  const handleOnResize = () => {
    if (window.innerWidth >= remToPixels(42) && isMenuOpen) {
      onToggleMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
    return () => window.removeEventListener('resize', handleOnResize);
  }, [isMenuOpen, onToggleMenu]);

  return (
    <header>
      <StyledNav isMenuOpen={isMenuOpen}>
        <StyledMenuBar>
          <Link to="/" className="home-link">
            {siteTitle}
          </Link>
          <Hamburger
            label="Show menu"
            toggled={isMenuOpen}
            toggle={onToggleMenu}
            size={30}
          />
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
          <StyledDesktopMenu>
            <ul>
              {categories.map(({ name, slug }) => {
                return (
                  <li key={slug}>
                    <Link to={`/${slug}/`}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </StyledDesktopMenu>
        </StyledMenuBar>
        <StyledMobileMenu isMenuOpen={isMenuOpen}>
          <ul>
            {categories.map(({ name, slug }, index) => {
              return (
                <li key={slug}>
                  <Link
                    style={{ '--delay': index } as CSSProperties}
                    to={`/${slug}/`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </StyledMobileMenu>
      </StyledNav>
    </header>
  );
};

export default Header;
