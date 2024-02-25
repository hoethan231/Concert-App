import React, {useState} from "react"
import "./SearchBar.css"

const SearchBar = () => {
  const {input, setInput} = useState("")
  return (
    <div className="input-wrapper">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input 
        placeholder="Search for a city" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
