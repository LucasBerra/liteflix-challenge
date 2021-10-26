import React, { useEffect, useContext } from "react";
import { IndexContext } from "./index.js";

// COMPONENTES :
import Navbar from "./components/Navbar/Navbar.js";
import MovieList from "./components/MovieList/MovieList.js";

// ASSETS :
import { VscPlay } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";

const imageUrlOriginal = "https://image.tmdb.org/t/p/original";

const App = () => {
  const { mainMovieData } = useContext(IndexContext);
  const homepageMovie = mainMovieData.results[6]; // specific index

  // const homepageMovieIndex = Math.floor(
  //   Math.random() * mainMovieData.results.length
  // );
  // const homepageMovie = mainMovieData.results[homepageMovieIndex]; // random index

  // SETEA LA IMÁGEN DE FONDO
  useEffect(() => {
    document.querySelector("body").style.backgroundImage = `url(${
      imageUrlOriginal + homepageMovie.backdrop_path
    })`;
  }, [homepageMovie.backdrop_path]);

  return (
    <div className="homepage_container">
      <Navbar />

      <div className="homepage_movie">
        <p className="font_bold">
          <span className="font_light"> Ahora disponible en </span>Liteflix
        </p>
        <h1 className="homepage_movie--name">{homepageMovie.title}</h1>
        <div className="homepage_movie--button_container">
          <div className="homepage_movie--button button--play">
            <VscPlay /> Reproducir
          </div>
          <div className="homepage_movie--button button--add">
            <AiOutlinePlus /> Mi lista
          </div>
        </div>
      </div>

      <MovieList />
    </div>
  );
};

export default App;
