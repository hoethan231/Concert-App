import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Routing"
import './App.css';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:5555/getUser', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };
        
        getUser();
    }, []);
    
    useEffect(() => {
        const cookieExists = document.cookie.includes("access-token");
        setIsLoggedIn(cookieExists);
    });

    return (
        <div className="App">
            <Navbar isLoggedIn={isLoggedIn} user={user}/>
            <Routing/>
        </div>
    );
}

export default App;
