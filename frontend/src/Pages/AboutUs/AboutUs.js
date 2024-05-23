import React from 'react'
import groupPicture from "../../assets/grouppicture.jpg"
import "./AboutUs.css"

function AboutUs() {

    return (
        <div className="about-page">
            <div className="image">
                <img className="group-picture" src={groupPicture}/>
            </div>
            <div className="about-us">
            <h1>HELLO !</h1>
            <p className= "description">
            We are a small team based at SJSU that developed this project for a kickstarter program.
             This is all of our first full stack project so it was difficult but was overall a great learning experience.
              We hope you enjoy!</p>
            <p className= "description-names">
            This website is made by Amy Okuma, Ethan Ho, Johnathan Huang, and Ling Tang. We also want to show our thanks to our mentor, Ankur Gupta, for helping us out in this project.</p>
            </div>
        </div>
    );

}

export default AboutUs;