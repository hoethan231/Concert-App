import { useState, useEffect } from "react"; 
import { config } from "../config"
import ConcertCard from "../Components/ConcertCard/ConcertCard.jsx"

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json?"
const API_KEY = "&apikey=" + config.concert_key;

function Concerts({ userCity }) {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const searchConcerts = async (city) => {
        try {
          setLoading(true);
          const response = await fetch(API_URL + 'keyword=concert&city=' + city + API_KEY);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setConcerts(data._embedded.events);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      if (userCity) {
        searchConcerts(userCity);
      }
    }, [userCity]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>
    }
  
    return (
        <div>
            {concerts.map((concert) => {
                return (
                  <ConcertCard concert={concert}/>
                )
            })}
        </div>
    );
  }
  
  export default Concerts;