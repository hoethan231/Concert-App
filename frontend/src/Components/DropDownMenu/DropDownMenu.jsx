import React from "react";
import "./DropDownMenu.css"

const DropDownMenu = () => {
    return (
        <div className="container">
            <ul className="list">
                <li>Profile</li>
                <li>Saved Concerts</li>
                <li>LogOut</li>
            </ul>
        </div>
    )
}

export default DropDownMenu;