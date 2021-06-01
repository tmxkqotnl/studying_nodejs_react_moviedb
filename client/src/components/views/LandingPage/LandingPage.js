import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import MainPoster from "./Section/MainPoster";
import GridCard from "../Commons/GridCard";
import axios from "axios";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setMovies([...res.results]);
        setMainMovieImage(res.results[0]);
      });
  }, []);
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainPoster
          image={`${process.env.REACT_APP_API_IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          description={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Latest Movies</h2>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => {
              return (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path
                      ? `${process.env.REACT_APP_API_IMAGE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
              );
        })}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
      
    </div>
  );
}

export default LandingPage;
