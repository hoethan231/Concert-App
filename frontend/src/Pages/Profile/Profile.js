import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConcertCard from '../../Components/ConcertCard/ConcertCard';
import defaultPfp from '../../assets/default_pfp.jpg';
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5555/getUser', { withCredentials: true });
                setUser(response.data);
                setConcerts(response.data.favorites);
            } catch (error) {
                console.log('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className='profile-container'>
            <div className='pfp-container'>
                <img src={defaultPfp} alt="Profile Picture" />
                {user && <h2>{(user.first + " " + user.last).toUpperCase()}</h2>}
            </div>
            <div className='saved-concerts-container'>
                <div className='saved-concerts-names'>
                <h3>SAVED CONCERTS</h3>
                <div className='saved-concerts'>
                    {console.log(concerts)}
                    {concerts && concerts?.length > 0 ? (
                        concerts.map((concert) => (
                            <ConcertCard key={concert.id} concert={concert} fromApi={false}/>
                        ))
                    ) : (
                        <h4>No concerts saved yet!</h4>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;