import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

const homepageMovieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20";

const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20";

export const IndexContext = createContext();

const Index = () => {
  const [mainMovieData, setMainMovieData] = useState(null);
  const [popularMovieData, setPopularMovieData] = useState(null);
  const [userMovieData, setUserMovieData] = useState([]);

  // Notificación para distintos eventos
  const [notification, setNotification] = useState("");

  // El componente cargará cuando se haga el fetch de ambas APIs
  const [isLoading, setIsLoading] = useState(true);

  // Manejar data del usuario
  useEffect(() => {
    const localData = localStorage.getItem("user-movies");
    if (localData) {
      setUserMovieData(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user-movies", JSON.stringify(userMovieData));
  }, [userMovieData]);

  // Fetchea las APIs
  useEffect(() => {
    fetch(homepageMovieUrl)
      .then((res) => res.json())
      .then((parsedData) => {
        setMainMovieData(parsedData);
      })
      .catch((err) => console.log(`Error de fetching: ${err}`));

    fetch(popularMoviesUrl)
      .then((res) => res.json())
      .then((parsedData) => {
        setPopularMovieData(parsedData);
      })
      .catch((err) => console.log(`Error de fetching: ${err}`));
  }, []);

  // Fetch check
  useEffect(() => {
    if (mainMovieData && popularMovieData) {
      setIsLoading(false);
    }
  }, [mainMovieData, popularMovieData]);

  return (
    <IndexContext.Provider
      value={{
        mainMovieData,
        popularMovieData,
        userMovieData,
        setUserMovieData,
        notification,
        setNotification,
      }}
    >
      {/* La App se renderiza cuando la data de API esta lista */}
      {!isLoading && <App />}
    </IndexContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
