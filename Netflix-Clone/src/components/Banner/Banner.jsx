import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const baseUrl = "https://image.tmdb.org/t/p/original";

  //function fetching data
  const fetchData = async () => {
    try {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${baseUrl}${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button play">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">
          {movie?.overview
            ? movie?.overview.slice(0, 150) + "..."
            : movie?.overview}
        </h1>
      </div>
      <div className="banner-fadeBottom" />
    </div>
  );
};
export default Banner;
