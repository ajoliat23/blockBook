import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
//have to address missing active variable in sidebaroption calls
function Sidebar() {
    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />
            <SidebarOption Icon={HomeIcon} text="Home" active={true} />
            <SidebarOption Icon={SearchIcon} text="Explore" active={undefined} />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" active={undefined} />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" active={undefined} />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" active={undefined} />
            <SidebarOption Icon={ListAltIcon} text="Lists" active={undefined} />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" active={undefined} />
            <SidebarOption Icon={MoreHorizIcon} text="More" active={undefined} />

            <Button variant="outlined" className="sidebar__tweet" fullWidth>
                Tweet
            </Button>
        </div>
    );
}

export default Sidebar;