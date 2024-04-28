import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConcertCard from '../../Components/ConcertCard/ConcertCard';
import defaultPfp from '../../assets/default_pfp.jpg';
import { config } from "../../config";
import "./Profile.css";

function Profile() {
  const [concertIds, setConcertIds] = useState([]);
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
      const fetchFavorites = async () => {
          try {
              const response = await axios.get('http://localhost:5555/getFavorites', { withCredentials: true });
              setConcertIds(response.data);
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

  return (
      <div className='profile-container'>
          <div className='pfp-container'>
              <img src={defaultPfp} alt="Profile Picture" />
              <h2>PROFILE NAME</h2>
              <button className='logout'>Log Out</button>
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