import { useState } from "react"; 
import { config } from "../config"

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=concert&city="
const API_KEY = "&apikey=" + config.concert_key;

function Concerts() {

    const [concerts, setConcerts] = useState([]);

    const searchConcerts = async (city) => {
        
        const response = await fetch(API_URL + city + API_KEY, {method: "GET"})
            .then(response => {
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
        
        const data = await response;
        setConcerts(data);
    }

    searchConcerts("San Jose"); //debugging
    console.log(concerts);
    return (
        <div>
            {concerts.map((concert, index) => {
                <div key={index}>
                    {concert}
                </div>
            })}
        </div>
    )

}

export default Concerts;