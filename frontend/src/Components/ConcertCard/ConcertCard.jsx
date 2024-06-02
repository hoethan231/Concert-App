import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConcertCard.css";
import Modal from "../Modal/Modal"
import dateFormat, { masks } from "dateformat";


const ConcertCard = ({ concert, fromApi }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [changeColor, setChangeColor] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    var convertTime = require("convert-time");
    
    useEffect(() => {
        const cookieExists = document.cookie.includes("access-token");
        setIsLoggedIn(cookieExists);
    }, []);

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
    }, [favorites]);

    function isFavorite() {
        for(let i=0; i<favorites.length; i++) {
            if(favorites[i].id === dbConcert.id) {
                return true;
            };
        }
        return false;
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
    
    const onHeartClick = (event) => {
        handleFavorite();
        setChangeColor(!changeColor);
        event.stopPropagation();
    }
    

    const dbConcert = (fromApi ? {
        name: concert.name,
        id: concert.id,
        imageUrl: get_image(),
        localDate: concert.dates.start.localDate,
        localTime: concert.dates.start.localTime,
        venueName: concert._embedded.venues[0].name,
        url: concert.url,
        note: concert.pleaseNote || " ",
        priceMin: concert.priceRanges?.[0]?.min || " ",
        priceMax: concert.priceRanges?.[0]?.max || " ",
        ticketLimit: concert.ticketLimit?.info || "No Ticket Limit"
    } : concert);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="card">
                <p id="dates">{dateFormat(dbConcert.localDate, "mmmm dS")}</p>
                <img className="picture" src={dbConcert.imageUrl} alt={dbConcert.name}/>
                <p>{convertTime(dbConcert.localTime)}</p>
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
                {fromApi && <Modal open = {isOpen} onClose={() => setIsOpen(false)}>
                    <h2>{dbConcert.name}</h2>
                    <div className="allInfo">
                        <img src={dbConcert.imageUrl} alt={dbConcert.name}/>
                        <div className="openInfo">
                            <p><span>Important Event Info: </span>
                                {showMore ? dbConcert.note : `${dbConcert.note.substring(0,200)}${dbConcert.note.length > 200 ? '...' : ' '}`}
                                {dbConcert.note.length > 200 && (
                                    <button id="showMore" onClick={toggleShowMore}>
                                        {showMore ? "show less" : "show more"}
                                    </button>
                                )}
                            </p>
                            <p><span>Date:</span> {dateFormat(dbConcert.localDate, "mmmm dS")} @ {convertTime(dbConcert.localTime)}</p>
                            <p id ="venue"><span>Venue:</span> {dbConcert.venueName}</p>
                            <p><span>Price Range: </span> 
                                ${Number(dbConcert.priceMin).toFixed(2)} - ${Number(dbConcert.priceMax).toFixed(2)}
                            </p>
                            <p>{dbConcert.ticketLimit}</p>
                            <a href={dbConcert.url} target="_blank">
                                <button id="getTickets"> get tickets</button>
                            </a>
                        </div>
                    </div>
                </Modal>}
        </>
    )

}

export default ConcertCard;