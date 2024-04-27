import React, { useState, useEffect } from "react"
import {signedInRoutes, signedOutRoutes} from '../../Routing'
import "./Navbar.css"
import DropDownMenu from "../DropDownMenu/DropDownMenu";


function Navbar({isLoggedIn}) {

    const [clicked, setClicked] = useState(false);
    const routes = isLoggedIn ? signedInRoutes : signedOutRoutes;
    const [openProfile, setOpenProfile] = useState(false);

    return(
        <nav className="NavbarItems">
            <h1><a className = "navbar-logo" href="/">RESONATE</a></h1>
            <div className="menu-icon" onClick ={() =>setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"} onClick={() => setOpenProfile ((prev) => !prev)}>
                {routes.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.path}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
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