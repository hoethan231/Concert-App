import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import Concerts from "./Pages/Concerts/Concerts"

function Routing() {

    const routes = [

        { Component: Home, path: '/' },
        { Component: AboutUs, path: '/about-us' },
        { Component: Concerts, path: '/concerts' }

    ]

    return (
        <Routes>
            {routes.map(({path, Component}, index) => {
                return (
                    <Route 
                    key = {index} 
                    path = {path} 
                    element = {Component}
                    />
                )
                })}
        </Routes>
    )
}

export default Routing;