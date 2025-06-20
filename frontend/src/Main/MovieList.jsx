import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaStar, FaFilter } from "react-icons/fa";
import { movies } from "../Data/movies";
import "./MovieList.css";

const languages = ["Tamil", "English", "Hindi", "Malayalam", "Telugu", "Bengali", "Gujarati", "Kannada"];
const genres = ["Drama", "Thriller", "Action", "Comedy", "Family", "Crime", "Adventure", "Horror", "Romantic", "Sports", "Animation", "Anime", "Fantasy", "Musical", "Mystery", "Sci-Fi", "Social", "Supernatural"];
const formats = ["2D", "3D", "4DX", "4DX 3D", "MX4D 3D", "2D SCREEN X", "IMAX 3D", "HOUSEFULL 5A", "HOUSEFULL 5B", "ICE 3D"];

const MovieList = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleSelection = (item, list, setter) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesLang = selectedLanguage
      ? movie.langs?.split(",").map(l => l.trim().toLowerCase()).includes(selectedLanguage.toLowerCase())
      : true;
    const matchesGenre = selectedGenres.length
      ? selectedGenres.some(genre => movie.genres?.includes(genre))
      : true;
    const matchesFormat = selectedFormats.length
      ? selectedFormats.some(fmt => movie.formats?.includes(fmt))
      : true;
    return matchesLang && matchesGenre && matchesFormat;
  });

  return (
    <div className="movie-list-container">
      {/* Mobile Filter Toggle */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <FaFilter /> Filters
      </button>

      {/* Filters */}
      <div className={`filters ${showMobileFilters ? 'show' : ''}`}>
        <h2>Filters</h2>

        {/* Languages */}
        <div className="filter-section">
          <div className="filter-section-header">
            <h3>Languages</h3>
            <button className="clear-btn" onClick={() => setSelectedLanguage("")}>Clear</button>
          </div>
          <div className="filter-tags">
            {languages.map(lang => (
              <span
                key={lang}
                className={`tag ${selectedLanguage === lang ? "selected" : ""}`}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? "" : lang)}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Genres */}
        <div className="filter-section">
          <div
            className="filter-section-header clickable"
            onClick={() => setShowGenres(!showGenres)}
          >
            <h3>Genres</h3>
            <button className="clear-btn" onClick={() => setSelectedGenres([])}>Clear</button>
          </div>
          {showGenres && (
            <div className="filter-tags">
              {genres.map(genre => (
                <span
                  key={genre}
                  className={`tag ${selectedGenres.includes(genre) ? "selected" : ""}`}
                  onClick={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Format */}
        <div className="filter-section">
          <div
            className="filter-section-header clickable"
            onClick={() => setShowFormats(!showFormats)}
          >
            <h3>Format</h3>
            <button className="clear-btn" onClick={() => setSelectedFormats([])}>Clear</button>
          </div>
          {showFormats && (
            <div className="filter-tags">
              {formats.map(format => (
                <span
                  key={format}
                  className={`tag ${selectedFormats.includes(format) ? "selected" : ""}`}
                  onClick={() => toggleSelection(format, selectedFormats, setSelectedFormats)}
                >
                  {format}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className="browse-btn">Browse by Cinemas</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <span className="active">Movies</span>
          <span>Stream</span>
          <span>Events</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>

        {/* Secondary Navigation */}
        <div className="secondary-nav">
          <span>Liththardbear</span>
          <span>Cooperassa</span>
          <span>Offers</span>
          <span>Gift Cards</span>
        </div>

        <div className="movie-section-header">
          <h2>Movies</h2>
          <div className="lang-chips">
            {languages.map(lang => (
              <span
                key={lang}
                className={`lang-chip ${selectedLanguage === lang ? "selected" : ""}`}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? "" : lang)}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="coming-soon">
          <h3>Coming Soon</h3>
          <a href="#">Explore Upcoming Movies &rarr;</a>
        </div>

        {/* Movie Grid */}
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <Link to={`/moviedetails/${movie.id}`} key={movie.id} className="movie-link">
              <div className="movie-card">
                <img src={movie.image || "https://via.placeholder.com/400x600?text=No+Image"} alt={movie.title} />
                <div className="movie-details">
                  {movie.likes ? (
                    <div className="likes">
                      <FaThumbsUp /> {movie.likes} Likes
                    </div>
                  ) : (
                    <div className="rating">
                      <FaStar /> {movie.rating}/10 {movie.votes} Votes
                    </div>
                  )}
                  <h4 className="movie-title">{movie.title}</h4>
                  <p className="movie-age">{movie.age}</p>
                  <p className="movie-langs">{movie.langs}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;