import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./DropDownMenu.css"

const DropDownMenu = ({user}) => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await axios.get('http://localhost:5555/logout', { withCredentials: true });
        navigate("/");
        navigate(0);
    }

    return (
        <div className="dropDownMenu">
            <ul>
                {user && <li>{user.first + " " + user.last}</li>}
                <li><hr color="#D9D9D9"></hr></li>
                <li className="item" ><a href="/profile">My Profile</a></li>
                <li className="item"><a href="/settings">Settings</a></li>
                <li className="item" onClick={handleLogout}><a>Log Out</a></li>
            </ul>
        </div>
    )
}

export default DropDownMenu;