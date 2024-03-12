import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="input-wrapper" onSubmit={handleSubmit}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input 
        placeholder="Search for a city" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
