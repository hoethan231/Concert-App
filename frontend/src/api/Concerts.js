import { useState, useEffect } from "react"
import { config } from "../../src/config.js"
import ConcertCard from "../../src/Components/ConcertCard/ConcertCard.jsx"
import "./Concerts.css"

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&locale=*&size=12&relevance,asc&apikey=" + config.concert_key;

function Concerts({ userCity }) {
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const searchConcerts = async (city) => {
        try {
          setLoading(true);
          const response = await fetch(API_URL + '&city=' + city);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setConcerts(data._embedded.events);
          setLoading(false);
          setError(null);
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
      return <div>There are no concerts in {userCity}</div>
    }
  
    return (
      (concerts?.length > 0) ? (
        <div className="container">
          {concerts.map((concert) => {
            return (
              <ConcertCard concert={concert}/>
              )
            })}
        </div>
      ) : (
        <div className="empty">
        </div>
      )
    );
  }
  
  export default Concerts;