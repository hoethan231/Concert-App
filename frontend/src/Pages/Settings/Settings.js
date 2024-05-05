import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Settings.css"
import defaultPfp from '../../assets/default_pfp.jpg';

function Settings() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5555/getUser', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error.message);
            }
        };

        fetchUserInfo();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) {
            return; 
        }
        
        try {
            const response = await axios.delete("http://localhost:5555/deleteUsers", { withCredentials: true });
    
            if (response.status === 200) {
                console.log(response.data.message); 
                handleLogout();
            } else {
                console.error("Error deleting user:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    };

    const handleLogout = async () => {
        const response = await axios.get('http://localhost:5555/logout', { withCredentials: true });
        navigate("/");
        navigate(0);
    }

    return (
        <div className="setting-page">
          <div className='pfp-container'>
              <img src={defaultPfp} alt="Profile Picture" />
              {user && <h2>{(user.first + " " + user.last).toUpperCase()}</h2>}
              <button className='logout' onClick={handleLogout}>Log Out</button>
          </div>
          <div className="setting-container">
          <h1>PROFILE</h1>
            <div className="form">
              <form onSubmit={handleDelete}>
                <div class="form-row">
                    <div class="form-group">
                        <label htmlFor="text">First Name</label>
                        <br></br>
                        <input className="setting-text" type="text" id="first" value={user && user.first} readOnly/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="text">Last Name</label>
                        <br></br>
                        <input className="setting-text" type="text" id="last" value={user && user.last} readOnly/>
                    </div>
                </div>
                <div class="form-row">;
                    <div class="form-group">
                        <label htmlFor="email">Email</label>
                        <br></br>
                        <input className="setting-text" type="email" id="email" value={user && user.email} readOnly/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input className="setting-text" type="password" id="password" value="********" readOnly/>
                    </div>
                </div>
                <div className='btn-container'>
                    <label className='newsletter'>
                        <input type="checkbox" />
                        Receive weekly newsletter for concert updates?
                    </label>
                    <button id="delete_button" type="submit">Delete account</button>
                    <p>Permanently delete your account and all of your content.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
    
      )
    }

  export default Settings;
  
  