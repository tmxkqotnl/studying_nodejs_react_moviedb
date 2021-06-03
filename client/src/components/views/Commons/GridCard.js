import React from "react";
import { Col } from "antd";

function GridCard(props) {
  if(props.landingPage){
    return (
      <Col xxl={4} lg={6} md={8} xs={24}>
        <div style={{ position:"relative"}}>
          <a href={`/movie/${props.movieId}`}>
            <img
              src={props.image}
              style={{ width: "100%", height: "320px", borderRadius:"10px" }}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  }else{
    return (
      <Col xxl={4} lg={6} md={8} xs={24}>
        <div style={{ position:"relative"}}>
            <img
              src={props.image}
              style={{ width: "100%", height: "320px", borderRadius:"10px" }}
              alt={props.actorName}
            />
        </div>
      </Col>
    );
  }
  
}

export default GridCard;
