import React from "react";
import "../styling/SidebarOption.css";

function SidebarOption({ text, Icon, active }: { text: any; Icon: any; active: any }) {
    return (
        <div className={`sidebarOption  ${active && "sidebarOption--active"}`}>
            <Icon />
            <h2>{text}</h2>
        </div>
    );
}

export default SidebarOption;