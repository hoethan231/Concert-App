import { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Concerts from "../../api/Concerts.js"
import videoBg from "../../assets/background2.mp4"
import "../../App.css"
import"./Home.css"
import SeeMoreButton from "../../Components/SeeMoreButton/SeeMoreButton.js"


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSubmit = (query) => {
        setSearchQuery(query);
    }

    return (
        <div className="home-container">
            <video src={videoBg} autoPlay loop muted />
            <div className="fixed-contents">
                <h1 className="tagline">
                    FIND <span>CONCERTS</span> <br/> NEAR YOU
                </h1>
                <p className="subtext">The ultimate distination for concert exploration</p>
                <div className="search-container">
                    <SearchBar onSearch={handleSubmit}/>
                </div>
            </div>
            <div className="concerts-container">
                <Concerts userCity={searchQuery}/>
            </div>  
        </div>
    )
}

export default Home;

