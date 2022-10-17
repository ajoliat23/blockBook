import React from "react";
import "../Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";

function Sidebar() {
    return (
        <div className="sidebar">
            <img height="40px" src="bb_logo.png" id="logo" />
            <SidebarOption Icon={HomeIcon} text="Home" active={true} />
            <SidebarOption Icon={SearchIcon} text="Explore" active={false} />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" active={false} />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" active={false} />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" active={false} />
            <SidebarOption Icon={ListAltIcon} text="Lists" active={false} />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" active={false} />
            <SidebarOption Icon={MoreHorizIcon} text="More" active={false} />

            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Post
            </Button>
        </div>
    );
}

export default Sidebar;