import { useState, useRef, useEffect } from "react"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Radio from "../../Components/Radio/Radio"
import Concerts from "../../api/Concerts.js"
import videoBg from "../../assets/background2.mp4"
import "../../App.css"
import"./Home.css"
import SeeMoreButton from "../../Components/SeeMoreButton/SeeMoreButton.js"


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState("");
    const contentWrapperRef = useRef(null);

    useEffect(() => {
        if(searchQuery) {
            autoScroll(contentWrapperRef);
        }
    }, [searchQuery]);
    
    const handleSubmit = (query) => {
        setSearchQuery(query);
    }

    const autoScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth"});
        }
    }

    return (
        <div className="home-container">
            <div className="video-container">
                <video src={videoBg} autoPlay loop muted />
            </div>
            <div className={`fixed-contents ${searchQuery && 'with-search'}`}>
                <h1 className="tagline">
                    FIND <span>CONCERTS</span> <br/> NEAR YOU
                </h1>
                <p className="subtext">The ultimate destination for concert exploration</p>
                <div className="search-container">
                    <SearchBar onSearch={handleSubmit}/>
                </div>
            </div>
            {searchQuery && (
                <div className="content-wrapper" ref={contentWrapperRef}>
                    <div className="concerts-container">
                        <h1 className = "concerts-near">CONCERTS NEAR <br/> <span>{searchQuery}</span></h1>
                        <Concerts userCity={searchQuery}/>
                    </div>  
                    <div className="filter-container">
                        <h1>FILTER BY</h1>
                        <br/>
                        <div className="radio-btns">
                            <Radio value="relevancy" selected={selected} text="relevancy" onChange={setSelected}/>
                            <Radio value="date" selected={selected} text="date" onChange={setSelected}/>
                            <Radio value="name" selected={selected} text="name" onChange={setSelected}/>
                            {/* <div>
                                <input type="radio" name="filter" value="relevancy" id="relevancy" onClick={setFilter}/>
                                <label className="check" htmlFor="relevancy">relevancy</label>
                            </div>
                            <div>
                                <input type="radio" name="filter" value="date" id="date" onClick={setFilter}/>
                                <label htmlFor="date">date</label>
                            </div>
                            <div>
                                <input type="radio" name="filter" value="name" id="name" onClick={setFilter}/>
                                <label htmlFor="name">name</label>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;

