import React, { useEffect, useState } from "react";
import MainPoster from "../Commons/MainPoster";
import MovieInfo from "./Section/MovieInfo";
import { Row } from "antd";
import GridCard from "../Commons/GridCard";
import Favorite from "./Section/Favorite";

function MovieDetail(props) {
  const movieId = props.match.params.movieId; // URL 파라미터 가져오기

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  useEffect(() => {
    const endpointCredit = `${process.env.REACT_APP_API_URL}movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
    const endpointInfo = `${process.env.REACT_APP_API_URL}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;

    fetch(endpointCredit)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCasts(res.cast);
      });
    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovie(res);
      });
    return () => {};
  }, []);
  return (
    <div>
      <MainPoster
        image={`${process.env.REACT_APP_API_IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        description={Movie.overview}
      ></MainPoster>

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}></Favorite>
        </div>
        <MovieInfo movie={Movie}></MovieInfo>
      </div>
      <br />
      <div
        style={{ display: "flex", justifyContent: "center", marign: "2rem" }}
      >
        <button style={{ margin: "0 0 30px 0" }} onClick={toggleActorView}>
          Toggle Actor View
        </button>
      </div>
      {ActorToggle && (
        <Row gutter={[16, 16]}>
          {Casts &&
            Casts.map((actor, index) => {
              return (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      actor.profile_path
                        ? `${process.env.REACT_APP_API_IMAGE_URL}w500${actor.profile_path}`
                        : null
                    }
                    actorName={actor.name}
                  />
                </React.Fragment>
              );
            })}
        </Row>
      )}
    </div>
  );
}

export default MovieDetail;
