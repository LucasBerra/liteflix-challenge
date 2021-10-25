import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const homepageMovieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20";

const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20";

export const IndexContext = createContext();

const Index = () => {
  const [mainMovieData, setMainMovieData] = useState(null);
  const [secondaryMovieData, setSecondaryMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setSecondaryMovieData(parsedData);
      })
      .catch((err) => console.log(`Error de fetching: ${err}`));
  }, []);

  useEffect(() => {
    if (mainMovieData && secondaryMovieData) {
      setIsLoading(false);
    }
  }, [mainMovieData, secondaryMovieData]);

  return (
    <IndexContext.Provider value={{ mainMovieData, secondaryMovieData }}>
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
