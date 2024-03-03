import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Concerts from "./api/Concerts.js"
import Routing from "./Routing"
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routing/>
      <Concerts/>
    </div>
  );
}

export default App;
