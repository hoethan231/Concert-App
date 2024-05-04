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
            <div className="video-container">
                <video src={videoBg} autoPlay loop muted />
            </div>
            <div className="fixed-contents">
                <h1 className="tagline">
                    FIND <span>CONCERTS</span> <br/> NEAR YOU
                </h1>
                <p className="subtext">The ultimate distination for concert exploration</p>
                <div className="search-container">
                    <SearchBar onSearch={handleSubmit}/>
                </div>
            </div>
            {searchQuery && (
                <div className="content-wrapper">
                    <div className="concerts-container">
                        <h1 className = "concerts-near">CONCERTS NEAR <br/> <span>SAN JOSE, CA</span></h1>
                        <Concerts userCity={searchQuery}/>
                    </div>  
                    <div className="filter-container">
                        <h1>FILTER BY</h1>
                        <br/>
                        <div className="radio-btns">
                            <div>
                                <input type="radio" name="filter" value="relevancy" id="relevancy"/>
                                <label htmlFor="relevancy">Relevancy</label>
                            </div>
                            <div>
                                <input type="radio" name="filter" value="date" id="date"/>
                                <label htmlFor="date">Date</label>
                            </div>
                            <div>
                                <input type="radio" name="filter" value="name" id="name"/>
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;

