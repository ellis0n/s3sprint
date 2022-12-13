import React from "react";
import { useEffect, useState } from "react";
import Profile from "./Profile";

const Banner = () => {
  const [total, setTotal] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateTotal = async () => {
      await fetch("http://localhost:3500/movies", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => setTotal(response.total));
    };
    updateTotal();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  const scrollBanner =
    scrollY > 75
      ? {
          position: "fixed",
          top: 0,
          width: "100%",
          background: "#29323c",
          height: "2em",
          font: "1em",
          zIndex: 1,
        }
      : {};

  const scrollSlogan =
    scrollY > 75 ? { display: "block" } : { display: "none" };

  const scrollLogo = scrollY > 75 ? { display: "block" } : { display: "none" };

  const scrollProf = scrollY > 75 ? { display: "none" } : { display: "block" };

  return (
    <div className="banner" style={scrollBanner}>
      <div className="logo">
        <h1 display={scrollLogo}>movieAPI</h1>
      </div>
      <div className="slogan" display={scrollSlogan}>
        <p>{`Over ${total - 1} movies you've never heard of.`}</p>
      </div>
      <Profile style={scrollProf} />
    </div>
  );
};

export default Banner;
