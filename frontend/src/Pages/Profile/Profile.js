import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConcertCard from '../../Components/ConcertCard/ConcertCard';
import defaultPfp from '../../assets/default_pfp.jpg';
import { config } from "../../config";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [concertIds, setConcertIds] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchFavorites = async () => {
          try {
              const response = await axios.get('http://localhost:5555/getUser', { withCredentials: true });
              setUser(response.data);
              setConcertIds(response.data.favorites);
          } catch (error) {
              console.log('Error fetching favorites:', error);
          }
      };

      fetchFavorites();
  }, []);

  useEffect(() => {
      const fetchConcertDetails = async () => {
          const promises = concertIds.map(concertId => axios.get(`https://app.ticketmaster.com/discovery/v2/events/${concertId}.json?apikey=${config.concert_key}`));
          const responses = await Promise.all(promises);
          const concertDetails = responses.map(response => response.data);
          setConcerts(concertDetails);
      };

      if (concertIds.length > 0) {
          fetchConcertDetails();
      }
  }, [concertIds]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:5555/logout', { withCredentials: true });
    navigate("/");
    navigate(0);
  }

  return (
      <div className='profile-container'>
          <div className='pfp-container'>
              <img src={defaultPfp} alt="Profile Picture" />
              {user && <h2>{(user.first + " " + user.last).toUpperCase()}</h2>}
              <button className='logout' onClick={handleLogout}>Log Out</button>
          </div>
          <div className='saved-concerts-container'>
              <h2>SAVED CONCERTS</h2>
              <div className='saved-concerts'>
                  {concerts.length > 0 ? (
                      concerts.map((concert) => (
                          <ConcertCard key={concert.id} concert={concert} />
                      ))
                  ) : (
                      <h3>No concerts saved yet!</h3>
                  )}
              </div>
          </div>
      </div>
  );
}

export default Profile;