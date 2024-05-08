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

    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState("relevancy");
    const contentWrapperRef = useRef(null);
    const [concertsError, setConcertsError] = useState(false);

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
        console.log("Concerts error:", error);
        setConcertsError(error); 
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
                    {(concertsError || !searchQuery) && <div className="search-error-message">{concertsError ? 'The city does not exist or there are no concerts in the area.' : ''}</div>}
                </div>
            </div>
            {!concertsError && searchQuery && (
                <div className="content-wrapper" ref={contentWrapperRef}>
                    <div className="concerts-container">
                        <h1 className = "concerts-near">CONCERTS NEAR <br/> <span>{searchQuery}</span></h1>
                        <Concerts userCity={searchQuery} selected={selected} onError={handleConcertsError} />
                        <SeeMoreButton class="see-more-button"/>
                    </div>  
                    <div className="filter-container">
                        <h1>FILTER BY</h1>
                        <br/>
                        <div classname="radio-container">
                            <div className="radio-btns">
                                <Radio value="relevancy" selected={selected} text="relevancy" onChange={setSelected}/>
                                <Radio value="name" selected={selected} text="name" onChange={setSelected}/>
                                <Radio value="date" selected={selected} text="date" onChange={setSelected}/>
                            </div>
                        </div>
                    </div>
                
                </div>
            )}
        </div>
    )
}

export default Home;

