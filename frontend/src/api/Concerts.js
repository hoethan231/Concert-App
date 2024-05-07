import { useState, useEffect } from "react"
import { config } from "../../src/config.js"
import ConcertCard from "../../src/Components/ConcertCard/ConcertCard.jsx"
import "./Concerts.css"

function Concerts({ userCity, selected }) {

    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchConcerts = async (city) => {
        setLoading(true);
        let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&locale=*&size=12&apikey=${config.concert_key}`;
        
        switch (selected) {
            case "relevancy":
                apiUrl += "&sort=relevance,desc";
                break;
            case "date":
                apiUrl += "&sort=date,asc";
                break;
            case "name":
                apiUrl += "&sort=name,asc";
                break;
            default:
                break;
        }
    
        if (city) {
            apiUrl += `&city=${city}`;
        }

        try {
            const response = await fetch(apiUrl);
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
        
    }, [userCity, selected]);

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
            <ConcertCard concert={concert} fromApi={true}/>
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