import React from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";

/* COMPONENTS */
import SidebarOption from "./SidebarOption";
import { auth, db } from "../firebase";

/* ICONS */
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Hello {user?.displayName}</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>

        <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr /> {/* Horizontal line */}
      <SidebarOption Icon={ExpandMoreIcon} title="Show More" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding-bottom: 10px;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px; /* Makes the area around the icon larger, to make it look like a square button with an icon in the middle */
    color: #42974b; /* color of the icon */
    font-size: 18px; /* Size of the icon */
    background-color: white; /* Colour of the icon background */
    border-radius: 999px; /* Makes the element a circle */
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    /* Targets all h2 tags in the SidebarInfo Div */
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    /* Targets all h3 tags in the SidebarInfor Div */
    display: flex; /* Display type flex, used so we can use align-items center */
    font-size: 12px; /* Font size */
    font-weight: 400; /* Thickness of text */
    align-items: center; /* Very useful to align icons with text. */
  }

  > h3 > .MuiSvgIcon-root {
    /* Targets all icons within an h3 tag in the SidebarInfo Div */
    font-size: 14;
    margin-top: 2px;
    margin-right: 2px;
    color: green;
  }
`;
