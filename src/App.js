import React, { useEffect, useContext } from "react";
import { IndexContext } from "./index.js";

// COMPONENTES :
import Navbar from "./components/Navbar/Navbar.js";
import MovieList from "./components/MovieList/MovieList.js";

// ASSETS :
import { VscPlay } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";

const imageUrlOriginal = "https://image.tmdb.org/t/p/original";
const imageUrlW500 = "https://image.tmdb.org/t/p/w500";

const App = () => {
  const { mainMovieData, userMovieData, setUserMovieData } =
    useContext(IndexContext);

  const homepageMovie = mainMovieData.results[8]; // USO UNA PELÍCULA EN ESPECÍFICO

  // const homepageMovieIndex = Math.floor(
  //   Math.random() * mainMovieData.results.length
  // );
  // const homepageMovie = mainMovieData.results[homepageMovieIndex]; // random index

  const addMovieTolist = () => {
    const movieObject = {
      title: homepageMovie.title,
      img: imageUrlW500 + homepageMovie.backdrop_path,
      id: homepageMovie.id,
    };

    if (!userMovieData.some(({ title }) => title === movieObject.title)) {
      setUserMovieData([...userMovieData, movieObject]);
    } else {
      console.log("Ya se agregó esa peli capo (INSERTAR LÓGICA PA AVISAR)");
    }
  };

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
          <div
            className="homepage_movie--button button--add"
            onClick={addMovieTolist}
          >
            <AiOutlinePlus /> Mi lista
          </div>
        </div>
      </div>

      <MovieList />
    </div>
  );
};

export default App;
