import React, { useState } from "react";
import "./Radio.css";

const Radio = ({ selected, onChange, text, value }) => {
    return (
        <div className="modern-radio-container" onClick={()=> {onChange(value);}}>
            <div className={`radio-outer-circle ${value !== selected && "unselected"}`}>
                <div className={`radio-inner-circle ${value !== selected && "unselected-circle"}`}/>
            </div>
            <div className="helper-text">{text}</div>
        </div>
    );
}

export default Radio;