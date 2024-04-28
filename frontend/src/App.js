import React, { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Routing"
import './App.css';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookieExists = document.cookie.includes("access-token");
        setIsLoggedIn(cookieExists);
    });

    return (
        <div className="App">
            <Navbar isLoggedIn={isLoggedIn}/>
            <Routing isLoggedIn={isLoggedIn}/>
        </div>
    );
}

export default App;
