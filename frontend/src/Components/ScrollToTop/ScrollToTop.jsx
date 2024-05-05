import React, { useState, useEffect } from "react";
// import "./ScrollToTop.css"

const ScrollToTop = ({ hover }) => {
    
    const [showButton, setShowButton] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) {
                setShowButton(true);
            }
            else {
                setShowButton(false);
                setIsHovered(false);
            }
        });
    }, []);

    const autoScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    return (
        <div>
            {showButton && <i className={isHovered ? "fa-solid fa-circle-up fa-4x" : "fa-regular fa-circle-up fa-4x"}
            style={{
                position: "fixed",
                bottom: "50px",
                right: "50px",
                color: "#F9F8F8",
                cursor: "pointer"
            }}
            onClick={autoScroll} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ></i>}
        </div>
    );
};

export default ScrollToTop;