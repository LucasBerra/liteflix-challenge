import React, { useEffect, useContext } from "react";
import { IndexContext } from "./index.js";

// COMPONENTES :
import Navbar from "./components/Navbar.js";
import MovieList from "./components/MovieList.js";

// ASSETS :
import { VscPlay } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";

// Links para setear imágenes fetcheadas
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

  // Se eligió una película específica
  const homepageMovie = mainMovieData.results
    .filter(({ title }) => title === "Night Teeth")
    .pop();

  //--------------------------------------------------------------------------------
  //  Hay una branch de la página con lógica para películas destacadas aleatorias.
  //
  //  El deploy se encuentra en https://liteflix-challenge-alt.netlify.app/
  //--------------------------------------------------------------------------------

  // Agregar película destacada a 'Mis Películas'
  const addHomepageMovieToList = () => {
    const movieObject = {
      title: homepageMovie.title.toUpperCase(),
      img: imageUrlW500 + homepageMovie.backdrop_path,
      id: homepageMovie.id,
    };

    if (!userMovieData.some(({ title }) => title === movieObject.title)) {
      setUserMovieData([...userMovieData, movieObject]);

      setNotification("La película fue guardada");
      setTimeout(() => {
        setNotification("");
      }, 1500);
    } else {
      setNotification("La película ya se agregó");
      setTimeout(() => {
        setNotification("");
      }, 1500);
    }
  };

  // Setea el background-image para desktop y mobile
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
              <span className="homepage_movie--button_text">
                <VscPlay /> Reproducir
              </span>
            </div>
            <div
              className="homepage_movie--button button--add"
              onClick={addHomepageMovieToList}
            >
              <span className="homepage_movie--button_text">
                <AiOutlinePlus /> Mi lista
              </span>
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
      {/* El texto se setea al mostrar la notificación */}
      <p id="notification-text">{notification}</p>
      <VscChromeClose
        className="notification_close"
        onClick={() => setNotification("")}
      />
    </div>
  );
};

export default App;
