import React, { useState, useEffect, useContext, useRef } from "react";
import { IndexContext } from "../index";
import "../styles/MovieList/MovieList.css";

// ASSETS:
import UIplay from "../assets/ui-icons/play.svg";
import UIstar from "../assets/ui-icons/star.svg";
import { BiChevronDown } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

const imageUrlW500 = "https://image.tmdb.org/t/p/w500";

const MovieList = () => {
  const { popularMovieData, userMovieData, setUserMovieData, setNotification } =
    useContext(IndexContext);
  const [popularMovies] = useState(popularMovieData.results.slice(0, 4));
  const [showPopular, setShowPopular] = useState(true);

  return (
    <div className="movie_list">
      <div className="movie_list--content">
        <button
          className="dropdown-button"
          // onClick={() => setShowPopular(!showPopular)}
        >
          <span className="font_light">Ver: </span>
          {showPopular ? "Populares" : "Mis Películas"} <BiChevronDown />
          <div className="dropdown-menu">
            <div
              onClick={() => {
                setShowPopular(true);
                document.querySelector(".dropdown-button").blur();
              }}
            >
              <span>Populares</span>
              {showPopular && <FaCheck />}
            </div>
            <div
              onClick={() => {
                if (userMovieData.length !== 0) {
                  setShowPopular(false);
                  document.querySelector(".dropdown-button").blur();
                } else {
                  setNotification("'Mis películas' esta vacía");
                  setTimeout(() => {
                    setNotification("");
                  }, 2000);
                  document.querySelector(".dropdown-button").blur();
                }
              }}
            >
              <span>Mis películas</span>
              {!showPopular && <FaCheck />}
            </div>
          </div>
        </button>

        <div className="movie_list--map">
          {showPopular
            ? popularMovies.map((movie) => {
                return <PopularMovie {...movie} key={movie.id} />;
              })
            : userMovieData.map((movie) => {
                return (
                  <SavedMovie
                    {...movie}
                    key={movie.id}
                    userMovieData={userMovieData}
                    setUserMovieData={setUserMovieData}
                    setShowPopular={setShowPopular}
                  />
                );
              })}
        </div>
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
const SavedMovie = ({
  title,
  img,
  id,
  userMovieData,
  setUserMovieData,
  setShowPopular,
}) => {
  const [hover, setHover] = useState(false);
  const containerRef = useRef(null);

  const removeUserMovie = () => {
    const filteredData = userMovieData.filter((movie) => movie.id !== id);
    setUserMovieData(filteredData);

    if (userMovieData.length === 1) {
      setShowPopular(true);
    }
  };

  useEffect(() => {
    containerRef.current.style.backgroundImage = `url(${img})`;
  }, [img]);

  return (
    <div
      ref={containerRef}
      className="movie_bg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setHover(true)}
    >
      {/* RENDERIZADO CONDICIONAL CON TERNARIO */}
      {hover ? (
        <div className="movie">
          <VscChromeClose
            className="movie--remove"
            onClick={() =>
              removeUserMovie(userMovieData, setUserMovieData, title)
            }
          />
          <div className="movie--play_hover"></div>
          <p className="movie--name_hover">{title}</p>
        </div>
      ) : (
        <div className="movie">
          <VscChromeClose className="movie--remove" />
          <img src={UIplay} alt="Play button" className="movie--play" />
          <p className="movie--name">{title}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
