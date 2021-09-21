import React, { FC } from 'react';
import { Link } from 'gatsby';

interface HeaderProps {
  siteTitle?: string;
}

const Header: FC<HeaderProps> = ({ siteTitle = '' }: HeaderProps) => (
  <header>
    <nav>
      <Link to="/">{siteTitle}</Link>
    </nav>
  </header>
);

export default Header;
