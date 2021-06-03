import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import MainPoster from "../Commons/MainPoster";
import GridCard from "../Commons/GridCard";
import axios from "axios";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(1);

  const fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...Movies, ...res.results]);
        setMainMovieImage(res.results[0]);
        setCurrentPage(res.page);
      });
  };
  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${CurrentPage}`;
    fetchItems(endpoint);
  }, []);

  const loadMoreItems = () => {
    const endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&page=${CurrentPage + 1}`;

    fetchItems(endpoint);
  };
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
        <hr style={{ margin: "15px 0" }} />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => {
              return (
                <React.Fragment key={index}>
                  <GridCard
                    landingPage="true"
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
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
