import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
// import Routing from "./Routing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Routing /> */}
      <Routes>
        <Route element={<Home />} path='/'/>
      </Routes>
    </div>
  );
}

export default App;
