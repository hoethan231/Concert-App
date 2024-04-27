import React, { Component } from 'react'
import defaultPfp from '../../assets/default_pfp.jpg';
import axios from 'axios'
import "./Profile.css"

function Profile() {

    // axios.get('http://localhost:5555/getUser')
    // .then(response => {
    //     const user = response.data;
    //     console.log(user);
    // })
    // .catch(error => {
    //     console.error('Error fetching user:', error);
    // });
    

    return (
        <div className='profile-container'>
            <div className='pfp-container'>
                <img src={defaultPfp}></img>
                <h2>PROFILE NAME</h2>
                <button className='logout'>Log Out</button>
            </div>
            <div className='saved-concerts-container'>
                <h2>SAVED CONCERTS</h2>
                <div className='saved-concerts'>
                    <h3>No concerts saved yet!</h3>
                </div>
            </div>
        </div>
    );

}

export default Profile;