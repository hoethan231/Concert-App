import React, { useState } from "react"
import { MenuItems } from "./MenuItems"
import { Button } from "./Button"
import "./Navbar.css"
import { BrowserRouter as Routes, Route } from "react-router-dom";


function Navbar() {

    const [clicked, setClicked] = useState(false);

    return(
        <nav className="NavbarItems">
            <h1 className = "navbar-logo" href="/">RESONATE</h1>
            <div className="menu-icon" onClick ={() =>setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {/* {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })} */}
                <Routes><Route path={"/"}/></Routes>
            </ul>
            <Button>LOG IN</Button>
        </nav>
    )
}

export default Navbar;