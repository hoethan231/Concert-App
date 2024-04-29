import React, { useState, useEffect } from "react";
import "./DropDownMenu.css"

const DropDownMenu = ({user}) => {
    return (
        <div className="dropDownMenu">
            <ul>
                {user && <li>{user.first + " " + user.last}</li>}
                <li><hr color="#D9D9D9"></hr></li>
                <li className="item">My Profile</li>
                <li className="item">Settings</li>
                <li className="item">Log Out</li>
            </ul>
        </div>
    )
}

export default DropDownMenu;