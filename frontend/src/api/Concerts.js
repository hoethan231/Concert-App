import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../../src/config.js";
import ConcertCard from "../../src/Components/ConcertCard/ConcertCard.jsx";
import "./Concerts.css";

function Concerts({ userCity, selected, genre, seeMore, onError }) {

    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchConcerts = async (city) => {
            setLoading(true);
            let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?segmentName=music&size=${seeMore ? "45" : "15"}${city ? `&city=${city}` : ""}&sort=${selected}&locale=*&apikey=${config.concert_key}`;

            const genreIds = {
                pop: "KnvZfZ7vAeA",
                rock: "KnvZfZ7vAv6",
                hipHop: "KnvZfZ7vAv1",
                electronic: "KnvZfZ7vAvF",
                rAndB: "KnvZfZ7vAee",
                indie: "KnvZfZ7vAeA"
            };

            if (genre !== "") {
                try {
                    const genreId = genreIds[genre.toLowerCase()];
                    if (genreId) {
                        apiUrl += `&genreId=${genreId}`;
                    }
                } catch (e) {
                    console.log(e);
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
                onError(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                onError(true);
            }
        };

        if (userCity) {
            searchConcerts(userCity);
        }
    }, [userCity, selected, genre, seeMore, onError]);

    if(error) {
        return (
            <>
                <h1 className="errorMessage1">There are no {genre !== "all" ? genre : ""} concerts in "{userCity}"</h1>
                <h3 className="errorMessage2">Try checking out Oakland!</h3>
            </>
        );
    };

    return (
        <>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="loading"
                    >
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="error"
                    >
                        There are no concerts in {userCity}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!loading && !error && concerts.length > 0 && (
                    <motion.div
                        key="concerts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container"
                    >
                        {concerts.map((concert, i) => (
                            <motion.div
                                key={concert.id}
                                initial={{ opacity: 0, translateX: -50 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                exit={{ opacity: 0, translateX: 50 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <ConcertCard concert={concert} fromApi={true} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!loading && !error && concerts.length === 0 && (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="empty"
                    >
                        No concerts found.
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Concerts;
