import React, { useState } from "react"
import { Button } from "./Button"
import {routes} from '../../Routing'
import "./Navbar.css"


function Navbar() {

    const [clicked, setClicked] = useState(false);

    return(
        <nav className="NavbarItems">
            <h1><a className = "navbar-logo" href="/">RESONATE</a></h1>
            <div className="menu-icon" onClick ={() =>setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
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
            <Button>LOG IN</Button>
        </nav>
    )
}

export default Navbar;