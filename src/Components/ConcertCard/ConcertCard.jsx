import React from "react";

const ConcertCard = ({ concert }) => {

    return (
        <div className="concert">
            
            <div>
                <img src={concert.images[0].url !== "N/A" ? concert.images[0].url : "https://via.placeholder.com/400"} alt={concert.name}/>
            </div>

            <div>
                {concert.name}
            </div>
        </div>
    )

}

export default ConcertCard;