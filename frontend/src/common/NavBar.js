import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavItem>
        <StyledLink to="/chatroom">채팅방</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/openchat">오픈채팅</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/profile">프로필</StyledLink>
      </NavItem>
    </NavBarContainer>
  );
};

export default NavBar;

// Styled Components
const NavBarContainer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 60px;
  background-color: #f4e1d2;
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const NavItem = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff5722;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모의 텍스트 색상 상속 */

  &:hover {
    color: #ff5722;
  }
`;
