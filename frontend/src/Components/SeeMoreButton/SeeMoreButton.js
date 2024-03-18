import React from 'react'
import "./SeeMoreButton.css"

function SeeMoreButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick} className="see-more-button">
        See More
      </button>
    </div>
  )
}

export default SeeMoreButton
