import "./App.css";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Banner />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
