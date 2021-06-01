import React from "react";

function MainPoster(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%), url(${props.image}), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
            backgroundColor: "rgba(255,255,255,0.3",
            borderRadius:"10px",
            padding:"10px",
            lineHeight:"1.3rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 style={{ color: "black" }}>{props.title}</h2>
          <p style={{ color: "black", fontSize: "1rem" }}>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainPoster;
