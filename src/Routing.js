import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import Concerts from "./Pages/Concerts/Concerts"

function Routing() {

    const routes = [

        { Component: Home, path: '/' },
        { Component: AboutUs, path: '/AboutUs' },
        { Component: Concerts, path: '/Concerts' }

    ]

    return (
        <Router>
            <Routes>
                {routes.map(({path, Component}, index) => (
                    <Route 
                    key = {index} 
                    path = {path} 
                    component = {Component}
                    />
                ))}
            </Routes>
        </Router>
    )
}

export default Routing;