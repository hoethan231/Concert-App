import { useState } from "react"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Concerts from "../../api/Concerts.js"
import "../../App.css"
import"./Home.css"

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSubmit = (query) => {
        setSearchQuery(query);
    }

    return (
        <div className="home-container">
            <h1 className="tagline">FIND CONCERTS NEAR YOU</h1>
            <p>The ultimate distination to concert exploration</p>
            <div className="city-search">
                <SearchBar onSearch={handleSubmit}/>
                <Concerts userCity={searchQuery}/>
            </div>
        </div>
    )
}

export default Home;

