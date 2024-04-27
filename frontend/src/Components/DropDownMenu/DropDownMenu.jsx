import React from "react";
import "./DropDownMenu.css"

const DropDownMenu = () => {
    return (
        <div className="dropDownMenu">
            <ul className="list">
                <li>My Profile</li>
                <hr color="#D9D9D9"></hr>
                <li>Settings</li>
                <li>Log Out</li>
            </ul>
        </div>
    )
}

export default DropDownMenu;