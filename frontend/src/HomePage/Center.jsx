import React from "react";
import Carousel from "./Carousel";
import "./Center.css";
import { useNavigate } from "react-router-dom";

const Center = () => {
  const navigate = useNavigate();

  const handleMovies = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/movielist');
    } else {
      navigate('/log');
    }
  };

  return (
    <section className="cs-center">
      <div className="cs-center-left">
        <h1>Experience Movies<br />Like Never Before</h1>
        <p>
          Book your tickets in seconds and enjoy exclusive premieres,
          special screenings, and the latest blockbusters in premium theaters.
        </p>
        <button className="cs-movie-btn" onClick={handleMovies}>Movies</button>
      </div>
      <div className="cs-center-right">
        <Carousel />
      </div>
    </section>
  );
};

export default Center;
