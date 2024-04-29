import React, {useState} from "react";
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
    
    const [changeColor, setChangeColor] = useState(false)
    const onHeartClick = () => {
        setChangeColor(!changeColor)
    }

    return (
    <div className="card">
        <img className="picture" src={get_image(concert)} alt={concert.name}/>
        <h2 >{concert.name}</h2>
        <p>{concert._embedded.venues[0].name}</p>
        <p>{concert.dates.start.localDate}</p>
        <button onClick = {onHeartClick} className={`heart ${(changeColor === true) ? 'red' : ''}`}>
            <i class="fa fa-heart"></i>
        </button>

    </div>
    )

}

export default ConcertCard;