import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const movies = [
  {
    title: "Maaman",
    genre: "Action/Comedy",
    rating: 8.7,
    color: "#ff3f8b",
    image: "https://images.moneycontrol.com/static-mcnews/2025/05/20250516124955_djdjd.jpg?impolicy=website&width=770&height=431"
  },
  {
    title: "Eleven",
    genre: "Thriller/Horror",
    rating: 8.9,
    color: "#00cec9",
    image: "https://m.media-amazon.com/images/M/MV5BZTEyMTg5ODQtMDM5Ni00ODMxLTgyZTAtZDRmMWQzYmFjNzBmXkEyXkFqcGc@._V1_.jpg"
  },
  {
    title: "Thug Life",
    genre: "Action/Drama",
    rating: 8.5,
    color: "#ff5f5f",
    image: "https://assetscdn1.paytm.com/images/cinema/Thug-Life-cover%20(1)-9f66c940-4045-11f0-b426-a50671acfc24.jpg"
  },
  {
    title: "Ballerina",
    genre: "Action/Thriller",
    rating: 9.0,
    color: "#4a90e2",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/a8/df/6b/a8df6bed-a8de-64e9-58e9-420cebec6f36/2550456256271_169.png/1200x675.jpg"
  },
  {
    title: "Train Your Dragon",
    genre: "Fantasy/Action",
    rating: 8.2,
    color: "#8e44ad",
    image: "https://wallpapers.com/images/featured/how-to-train-your-dragon-tb8bu78cib3itwh0.jpg"
  },
];

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div className="carousel-slide" key={index}>
            <div className="carousel-card">
              <div className="carousel-poster" style={{ backgroundColor: movie.color }}>
                <img src={movie.image} alt={movie.title} />
              </div>
              
              <div className="carousel-rating">★ {movie.rating}</div>
              <h4 className="carousel-title">{movie.title}</h4>
              <p className="carousel-genre">{movie.genre}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
