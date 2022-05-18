import axios from "axios";
import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import instance from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const handleCliclk = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      console.log(movie?.title || movie?.name || movie?.original_name);
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(url);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie?.id}
            onClick={() => handleCliclk(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie?.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <iframe
          src={`https://www.youtube.com/embed/${trailerUrl}`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
          style={{
            height: "390pt",
            width: "100%",
          }}
        />
      )}
    </div>
  );
};

export default Row;
