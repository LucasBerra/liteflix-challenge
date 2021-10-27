import React, { useState, useEffect, useContext, useRef } from "react";
import { IndexContext } from "../../index";
import "./MovieList.css";
import UIplay from "../../assets/ui-icons/play.svg";
import UIstar from "../../assets/ui-icons/star.svg";
import { BiChevronDown } from "react-icons/bi";

// va a recibir como argumento el backdrop de menor tamaño y el título de la serie, mínimo
const imageUrlW500 = "https://image.tmdb.org/t/p/w500";

const MovieList = () => {
  const { popularMovieData, userMovieData } = useContext(IndexContext);
  const [popularMovies] = useState(popularMovieData.results.slice(0, 4));
  const [showPopular, setShowPopular] = useState(true);

  return (
    <div className="popular_movies">
      <div className="popular_movies--content">
        <button
          className="dropdown"
          onClick={() => setShowPopular(!showPopular)}
        >
          <span className="font_light">Ver: </span>{" "}
          {showPopular ? "Populares" : "Mis Películas"} <BiChevronDown />
        </button>
        {showPopular
          ? popularMovies.map((movie) => {
              return <PopularMovie {...movie} key={movie.id} />;
            })
          : userMovieData.map((movie) => {
              return <SavedMovie {...movie} key={movie.id} />;
            })}
      </div>
    </div>
  );
};

// PELÍCULAS POPULARES
const PopularMovie = ({ title, backdrop_path, vote_average, release_date }) => {
  const [hover, setHover] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.style.backgroundImage = `url(${
      imageUrlW500 + backdrop_path
    })`;
  }, [backdrop_path]);

  return (
    <div
      ref={containerRef}
      className="movie_bg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* RENDERIZADO CONDICIONAL CON TERNARIO */}
      {hover ? (
        <div className="movie">
          <div className="movie--play_hover"></div>
          <p className="movie--name_hover">{title}</p>
          <div className="movie--rating_hover">
            <img src={UIstar} alt="Rating star" />
            <span>{vote_average}</span>
          </div>
          <span className="movie--year_hover">{release_date.slice(0, 4)}</span>
        </div>
      ) : (
        <div className="movie">
          <img src={UIplay} alt="Play button" className="movie--play" />
          <p className="movie--name">{title}</p>
        </div>
      )}
    </div>
  );
};

//PELÍCULAS GUARDADAS
const SavedMovie = ({ title, img, id }) => {
  const [hover, setHover] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.style.backgroundImage = `url(${img})`;
  }, [img]);

  return (
    <div
      ref={containerRef}
      className="movie_bg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* RENDERIZADO CONDICIONAL CON TERNARIO */}
      {hover ? (
        <div className="movie">
          <div className="movie--play_hover"></div>
          <p className="movie--name_hover">{title}</p>
        </div>
      ) : (
        <div className="movie">
          <img src={UIplay} alt="Play button" className="movie--play" />
          <p className="movie--name">{title}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
