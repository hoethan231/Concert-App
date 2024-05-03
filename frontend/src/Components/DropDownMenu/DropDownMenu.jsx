import React, { useState, useEffect } from "react";
import "./DropDownMenu.css"

const DropDownMenu = ({user}) => {
    return (
        <div className="dropDownMenu">
            <ul>
                {user && <li>{user.first + " " + user.last}</li>}
                <li><hr color="#D9D9D9"></hr></li>
                <li className="item" ><a href="/profile">My Profile</a></li>
                <li className="item"><a href="/settings">Settings</a></li>
                <li className="item"><a>Log Out</a></li>
            </ul>
        </div>
    )
}

export default DropDownMenu;