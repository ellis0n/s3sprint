import "./App.css";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  const handleLogin = async (credentials) => {
    const jsonQuery = JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    });
    const response = await fetch("http://localhost:3500/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonQuery,
    });
    response
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "success") {
          setUser(credentials.username);
        }
      })
      .catch((error) => console.error(error));
    return { user };
  };

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
