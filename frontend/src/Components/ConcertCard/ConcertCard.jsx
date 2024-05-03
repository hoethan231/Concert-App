import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConcertCard.css"


const ConcertCard = ({ concert }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    
    useEffect(() => {
        const cookieExists = document.cookie.includes("access-token");
        setIsLoggedIn(cookieExists);
    });

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5555/getUser', { withCredentials: true });
                setFavorites(response.data.favorites);
            } catch (error) {
                console.log('Error fetching favorites:', error);
            }
        };
  
        fetchFavorites();
    });

    function isFavorite() {
        return favorites.includes(concert.id);
    }

    function get_image() {

        for(let i=0; i<concert.images.length; i++) {
            if(concert.images[i].ratio === "4_3") {
                return concert.images[i].url;
            }
        }

        return "https://via.placeholder.com/400";
    }

    const handleFavorite = async () => {
        try {
            const response = await axios.put(`http://localhost:5555/${isFavorite() ? 'removeFavorite' : 'addFavorite'}`, 
            {
                "favorites": concert.id
            },
            { withCredentials: true });
        } catch (error) {
            console.log('Error adding favorite:', error);
        }
    };
    
    const onHeartClick = () => {
        handleFavorite();
        setChangeColor(!changeColor);
    }

    return (
    <div className="card">
        <img className="picture" src={get_image()} alt={concert.name}/>
        <h2 >{concert.name}</h2>
        <p>{concert._embedded.venues[0].name}</p>
        <p>{concert.dates.start.localDate}</p>
        <p>{isLoggedIn}</p>
        {isLoggedIn && (<button onClick = {onHeartClick} className={`heart ${((changeColor === true) || isFavorite()) ? 'red' : ''}`}>
            <i className="fa fa-heart"></i>
        </button>)}

    </div>
    )

}

export default ConcertCard;