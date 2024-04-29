import React, { useState, useEffect } from "react"
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import defaultPfp from "../../assets/default_pfp.jpg";
import "./Navbar.css"


function Navbar({isLoggedIn}) {

    const [clicked, setClicked] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    return(
        <nav className="NavbarItems">
            <h1><a className = "navbar-logo" href="/">RESONATE</a></h1>
            <div className="menu-icon" onClick ={() =>setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                <li>
                    <a className="nav-links" href="/about-us">ABOUT</a>
                </li>
                {!isLoggedIn && <li>
                    <a className="nav-links" href="/login">LOG IN</a>
                </li>}
                {isLoggedIn && <li>
                    <a className="nav-links" href="/profile" onClick={() => setOpenProfile ((prev) => !prev)}>
                        <img className="profile-pic" src={defaultPfp}/>
                    </a>
                </li>}
            </ul>
            {
                openProfile && (
                    <DropDownMenu/>
                )
            }
        </nav>
    )
}

export default Navbar;