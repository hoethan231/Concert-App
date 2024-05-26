import { useState, useEffect } from "react"
import { config } from "../../src/config.js"
import ConcertCard from "../../src/Components/ConcertCard/ConcertCard.jsx"
import "./Concerts.css"

function Concerts({ userCity, selected, genre, onError}) {

    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchConcerts = async (city) => {
        setLoading(true);
        let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&locale=*&size=15&apikey=${config.concert_key}`;
        
        const genreIds = {
            pop: "KnvZfZ7vAeA",
            rock: "KnvZfZ7vAv6",
            hipHop: "KnvZfZ7vAv1",
            electronic: "KnvZfZ7vAvF",
            rAndB: "KnvZfZ7vAee",
            indie: "KnvZfZ7vAeA"
        };
        
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

        if (genre !== "") {
            try {
                const genreId = genreIds[genre.toLowerCase()];
                if (genreId) {
                    apiUrl += `&genreId=${genreId}`;
                }

            } catch (e){
                console.log(e)
            }
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
            onError(false)
        } catch (error) {
            setError(error);
            setLoading(false);
            onError(true);
        }
        };
    
        if (userCity) {
            searchConcerts(userCity);
        }
        
    }, [userCity, selected, genre, onError]);

    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
        console.log("The problem is" + error)
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