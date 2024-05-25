import { useState, useRef, useEffect } from "react"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Radio from "../../Components/Radio/Radio"
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop"
import Concerts from "../../api/Concerts.js"
import videoBg from "../../assets/background2.mp4"
import "../../App.css"
import"./Home.css"
import SeeMoreButton from "../../Components/SeeMoreButton/SeeMoreButton.js"


function Home() {

    const [searchQuery, setSearchQuery] = useState(sessionStorage.getItem("query") || "");
    const [selected, setSelected] = useState(sessionStorage.getItem("filter") || "relevance,desc");
    const [genre, setGenre] = useState(sessionStorage.getItem("genre") || "");
    const [seeMore, setSeeMore] = useState(false);
    const [concertsError, setConcertsError] = useState(false);
    const contentWrapperRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem("query", searchQuery);
        sessionStorage.setItem("filter", selected);
        sessionStorage.setItem("genre", genre);
    }, [searchQuery, selected, genre]);

    useEffect(() => {
        if(searchQuery) {
            autoScroll(contentWrapperRef);
        }
    }, [searchQuery]);
    
    const handleSubmit = (query) => {
        setSearchQuery(query);
        setConcertsError(false);
    }

    const autoScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth"});
        }
    }

    const handleConcertsError = (error) => {
        setConcertsError(error);
        console.log(error)
    }

    const handleSeeMore = () => {
        setSeeMore(!seeMore);
    }

    return (
        <div className="home-container">
            <ScrollToTop/>
            <div className="video-container">
                <video src={videoBg} autoPlay loop muted />
            </div>
            <div className={`fixed-contents ${searchQuery && 'with-search'}`}>
                <h1 className="tagline">
                    FIND <span>CONCERTS</span> <br/> NEAR YOU
                </h1>
                <p className="subtext">The ultimate destination for concert exploration</p>
                <div className="search-container">
                    <SearchBar onSearch={handleSubmit} />
                </div>
            </div>
            {searchQuery && (
                <div className="content-wrapper" ref={contentWrapperRef}>
                    <div className="concerts-container">
                        <h1 className = "concerts-near">CONCERTS NEAR <br/> <span>{searchQuery}</span></h1>
                        <Concerts userCity={searchQuery} selected={selected} genre={genre} seeMore={seeMore} onError={handleConcertsError} />
                        {!concertsError && <SeeMoreButton class="see-more-button" onClick={handleSeeMore}/>}
                    </div>  
                    <div className="filter-container">
                        <div className="radio-container">
                            <h1>FILTER BY</h1>
                            <br/>
                            <div className="radio-btns">
                                <Radio value="relevance,desc" selected={selected} text="relevance" onChange={setSelected}/>
                                <Radio value="name,asc" selected={selected} text="name" onChange={setSelected}/>
                                <Radio value="date,asc" selected={selected} text="date" onChange={setSelected}/>
                            </div>
                            <h1>Genre</h1>
                            <br/>
                            <div className="radio-btns">
                                <Radio value="" selected={genre} text="all" onChange={setGenre}/>
                                <Radio value="electronic" selected={genre} text="electronic" onChange={setGenre}/>
                                <Radio value="indie" selected={genre} text="indie" onChange={setGenre}/>
                                <Radio value="hipHop" selected={genre} text="hiphop" onChange={setGenre}/>
                                <Radio value="pop" selected={genre} text="pop" onChange={setGenre}/>
                                <Radio value="rAndB" selected={genre} text="R&B/rock" onChange={setGenre}/>
                                <Radio value="rock" selected={genre} text="rock" onChange={setGenre}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;
 
