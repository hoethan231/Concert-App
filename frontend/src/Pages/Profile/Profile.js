import React from 'react'
import axios from 'axios'
import "./Profile.css"

function Profile() {

    axios.get('http://localhost:5555/getUser')
    .then(response => {
        const user = response.data;
        console.log(user);
    })
    .catch(error => {
        console.error('Error fetching user:', error);
    });

    return (
        <div className='profile-container'>
            <div className='user'>
                <image/>
            </div>
            <div className='user-info'><h1>Hello World</h1></div>
        </div>
    );

}

export default Profile;