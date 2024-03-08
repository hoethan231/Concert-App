import React from "react";
import "./ConcertCard.css"

const ConcertCard = ({ concert }) => {

    function get_image(Concert) {

        for(let i=0; i<concert.images.length; i++) {
            if(concert.images[i].ratio === "4_3") {
                return concert.images[i].url;
            }
        }

        return "https://via.placeholder.com/400";
    }

    return (
    <div className="card">
        
        <img className="picture" src={get_image(concert)} alt={concert.name}/>
        <h2 >{concert.name}</h2>
        <p>{concert._embedded.venues[0].name}</p>
        <p>{concert.dates.start.localDate}</p>

    </div>
    )

}

export default ConcertCard;