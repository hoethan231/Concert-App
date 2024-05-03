import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import AboutUs from "./Pages/AboutUs/AboutUs"
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile"
import Settings from "./Pages/Settings/Settings"

const routes = [

    { 
        Component: Home, 
        path: '/',
        title: "",
        cName: ""
    },
    { 
        Component: AboutUs, 
        path: '/about-us',
        title: "ABOUT",
        cName: "nav-links"
    },
    { 
        Component: Login, 
        path: '/login',
        title: "LOG IN",
        cName: "nav-links"
    },
    { 
        Component: Profile, 
        path: '/profile',
        title: "PROFILE",
        cName: "nav-links"
    },
    {
        Component: Settings, 
        path: '/settings',
        title: "SETTINGS",
        cName: "nav-links"
    }

];

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
