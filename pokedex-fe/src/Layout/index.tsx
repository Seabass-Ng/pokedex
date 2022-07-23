import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'react-router-dom';

const LayoutContainer = styled.div`
  padding: 20px;
`;

const HeaderContainer = styled.header`
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 20px;
  text-align: center;
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

interface HeaderProps {
  prevEl?: React.ReactNode;
  nextEl?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ prevEl, nextEl }) => {
  return (
    <HeaderContainer>
      {prevEl}
      <Title>
        <Link to="/">Pokedex</Link>
      </Title>
      {nextEl}
    </HeaderContainer>
  );
};

interface LayoutProps {
  children?: React.ReactNode;
  headerProps?: HeaderProps;
}

const Layout: React.FC<LayoutProps> = ({ children, headerProps }) => {
  return (
    <LayoutContainer>
      <Header {...headerProps} />
      {children}
    </LayoutContainer>
  );
};

export default Layout;
