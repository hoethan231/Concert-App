import React from "react"
import "./Button.css"

const SIZES = [
    "btn--medium",
    "btn--large"
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    return(
        <button className={`btn ${checkButtonSize}`} onClick = {onClick} type = {type}>
            {children}
        </button>
    )
}