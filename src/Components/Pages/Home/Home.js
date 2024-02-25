import SearchBar from "../../SearchBar/SearchBar"
import "../../../App.css"
import"./Home.css"

function home() {
    return (
        <div className="home-container">
            <h1 className="tagline">FIND CONCERTS NEAR YOU</h1>
            <p>The ultimate distination to concert exploration</p>
            <div className="city-search">
                <SearchBar />
            </div>
        </div>
    )
}

export default home

