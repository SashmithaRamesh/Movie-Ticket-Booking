import React from "react";
import { FaThumbsUp, FaStar, FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from '../Data/movies';
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="movie-details-container">
        <h2>Movie not found!</h2>
        <button onClick={() => navigate("/")}>Back to Movies</button>
      </div>
    );
  }

  return (
    <div className="movie-whole">
    <div className="movie-details-container">
      {/* Navigation Bar */}
      <div className="movie-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Movies
        </button>
        <div className="nav-links">
          <span>Movies</span>
          <span>Stream</span>
          <span>Events</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>
      </div>

      {/* Movie Header */}
      <div className="movie-header">
        <div className="movie-poster">
          <img src={movie.image} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          <div className="engagement-stats">
            {movie.likes && (
              <span className="likes">
                <FaThumbsUp /> {movie.likes} are interested
              </span>
            )}
            {movie.rating && movie.votes && (
              <span className="rating">
                <FaStar /> {movie.rating}/10 ({movie.votes} Votes)
              </span>
            )}
            <span className="question">Are you interested in working this month?</span>
          </div>

          <div className="details-row">
            <span>{movie.formats.join(" | ")}</span>
            <span>{movie.langs}</span>
          </div>

          <div className="details-row">
            <span>{movie.duration}</span>
            <span>{movie.genres.join(" · ")}</span>
            <span>{movie.age}</span>
          </div>

          <button className="book-button">Book tickets</button>
          <div className="release-date">{movie.releaseDate}</div>
        </div>
      </div>

      {/* About Section */}
      <div className="section">
        <h2>About the movie</h2>
        <p>{movie.description}</p>
      </div>

      {/* Cast Section */}
      <div className="section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {movie.cast.map((member, idx) => (
            <div key={idx} className="cast-member">
              <div className="cast-avatar">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="cast-info">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MovieDetails;