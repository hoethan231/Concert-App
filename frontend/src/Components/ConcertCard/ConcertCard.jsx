import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConcertCard.css"


const ConcertCard = ({ concert, fromApi }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
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
        for(let i=0; i<favorites.length; i++) {
            if(favorites[i].id === dbConcert.id) {
                return true;
            }
        }
        return false;;
    }

    function get_image() {
        if(!fromApi) {
            return "https://via.placeholder.com/400";
        }
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
                "favorites": dbConcert
            },
            { withCredentials: true });
            setIsAnimating(true); 
            setTimeout(() => setIsAnimating(false), 300); 
        } catch (error) {
            console.log('Error adding favorite:', error);
        }
    };
    
    const onHeartClick = () => {
        handleFavorite();
        setChangeColor(!changeColor);
    }

    const dbConcert = (fromApi ? {
        name: concert.name,
        id: concert.id,
        imageUrl: get_image(),
        localDate: concert.dates.start.localDate,
        localTime: concert.dates.start.localTime,
        venueName: concert._embedded.venues[0].name
    } : concert);


    return (
    <div className="card">
        <p id="dates">{dbConcert.localDate}</p>
        <img className="picture" src={dbConcert.imageUrl} alt={dbConcert.name}/>
        <p>{dbConcert.localTime}</p>
        <h2 >{dbConcert.name}</h2>
        <p id ="venue">{dbConcert.venueName}</p>
        <p>{isLoggedIn}</p>
        {isLoggedIn && (
            <button 
                onClick = {onHeartClick} 
                className={`heart ${((changeColor === true) || isFavorite()) ? 'red' : ''}`}>
                <i className="fa fa-heart"></i>
        </button>)}

    </div>
    )

}

export default ConcertCard;