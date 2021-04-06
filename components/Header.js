import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      <HeaderLeft>
        
          <HeaderAvatar
            onClick={() => auth.signOut()} //Anon function to signout onClick
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <TooltipBox>Log Out</TooltipBox>

        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
  
  
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8; /*  */
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent; /* Looks better, blends into background */
    border: none;
    text-align: center;
    min-width: 30vw; /* Minimum reactive width is 30% of screen */
    outline: 0; /* Gets rid of the input outline */
    color: white; /* Color of text is white */
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    /* This is how you target Material-UI Icons */
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;


const TooltipBox = styled.div`
  color: cyan;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.15);
  width: 70px;
  padding: 2px;
  height: 20px;
  border-radius: 2px;
  font-size: 12px;
  margin-left: 10px;

  visibility: hidden;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
    :hover {
      opacity: 0.8;
    }
  }
  
  & ${HeaderAvatar}:hover + ${TooltipBox} {
    visibility: visible;
  }
`;

