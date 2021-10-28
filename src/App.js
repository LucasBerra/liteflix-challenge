import React, { useEffect, useContext } from "react";
import { IndexContext } from "./index.js";

// COMPONENTES :
import Navbar from "./components/Navbar/Navbar.js";
import MovieList from "./components/MovieList/MovieList.js";

// ASSETS :
import { VscPlay } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

const imageUrlOriginal = "https://image.tmdb.org/t/p/original";
const imageUrlW500 = "https://image.tmdb.org/t/p/w500";

const App = () => {
  const {
    mainMovieData,
    userMovieData,
    setUserMovieData,
    notification,
    setNotification,
  } = useContext(IndexContext);

  const homepageMovie = mainMovieData.results[9]; // USO UNA PELÍCULA EN ESPECÍFICO

  // const homepageMovieIndex = Math.floor(
  //   Math.random() * mainMovieData.results.length
  // );
  // const homepageMovie = mainMovieData.results[homepageMovieIndex]; // random index

  const addMovieTolist = () => {
    const movieObject = {
      title: homepageMovie.title.toUpperCase(),
      img: imageUrlW500 + homepageMovie.backdrop_path,
      id: homepageMovie.id,
    };

    if (!userMovieData.some(({ title }) => title === movieObject.title)) {
      setUserMovieData([...userMovieData, movieObject]);

      setNotification("La película fue guardada");
      // se esconderá la notificación después de 2 segundos
      setTimeout(() => {
        setNotification("");
      }, 2000);
    } else {
      setNotification("La película ya se agregó");
      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  // SETEA LA IMÁGEN DE FONDO
  useEffect(() => {
    document.querySelector("body").style.backgroundImage = `url(${
      imageUrlOriginal + homepageMovie.backdrop_path
    })`;
    document.querySelector(".bg-image").style.backgroundImage = `url(${
      imageUrlOriginal + homepageMovie.backdrop_path
    })`;
  }, [homepageMovie.backdrop_path]);

  return (
    <>
      <div className="bg-image"></div>

      <div className="homepage_container">
        <Navbar />

        <div className="homepage_movie">
          <p className="font_bold">
            <span className="font_light"> Míralo ya en </span>Liteflix
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

      {notification && (
        <NotificationComponent
          setNotification={setNotification}
          notification={notification}
        />
      )}
    </>
  );
};

const NotificationComponent = ({ notification, setNotification }) => {
  return (
    <div className="notification">
      {/* El texto se agregará al mostrarse la notificación*/}
      <p id="notification-text">{notification}</p>
      <VscChromeClose
        className="notification_close"
        onClick={() => setNotification("")}
      />
    </div>
  );
};

export default App;
