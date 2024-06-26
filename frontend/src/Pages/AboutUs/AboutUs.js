import React from 'react'
import groupPicture from "../../assets/grouppicture.jpg"
import "./AboutUs.css"

function AboutUs() {

    return (
        <div className="about-page">
            <div className="wrapper">
                <div className="about-picture">
                    <img className="group-picture" src={groupPicture}/>
                </div>
                <div className="about-text">
                    <h1>HELLO !</h1>
                    <p>
                        We are a small team based at SJSU that developed this project for a kickstarter program.
                        This is all of our first full stack project so it was difficult but was overall a great learning experience.
                        We hope you enjoy! <br></br> <br></br>  This website is made by Amy Okuma, Ethan Ho, Johnathan Huang, and Ling Tang. 
                        We also want to show our thanks to our mentor, Ankur Gupta, for helping us out in this project.
                    </p>
                </div>
            </div>
        </div>
    );

}

export default AboutUs;