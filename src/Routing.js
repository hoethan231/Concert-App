import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import Concerts from "./Pages/Concerts/Concerts"
// import LogIn from "./Pages/LogIn/LogIn"

export const routes = [

    { 
        Component: Home, 
        path: '/',
        title: "Resonate",
        cName: ""
    },
    { 
        Component: AboutUs, 
        path: '/about-us',
        title: "ABOUT",
        cName: "nav-links"
    },
    { 
        Component: Concerts, 
        path: '/concerts',
        title: "CONCERTS",
        cName: "nav-links"
    }
    // { 
    //     Component: LogIn, 
    //     path: '/log-in',
    //     title: "LOGIN",
    //     cName: ""
    // }

]

export default function Routing() {

    return (
        <Routes>
            {routes.map((item, index) => {
                return (
                    <Route exact key={index} path={item.path} Component={item.Component}/>
                )
            })}
        </Routes>
    );

}