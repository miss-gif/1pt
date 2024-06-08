import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            <Link to="/">게시판</Link>
          </li>
          <li>
            <Link to="/calendar">달력</Link>
          </li>
        </ul>
        <ul>
          {isAuthenticated ? (
            <>
              <li>Welcome, User!</li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background-color: #f0f0f0;
  padding: 1rem;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: #333;
  }
`;
