import Axios from "axios";
import React, { useEffect,useState } from "react";
import "./Favorite.css";
import {Popover} from "antd";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  const fetchFavoriteMovie = ()=>{
    Axios.post("/api/favorite/getFavoriteMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setFavorites(res.data.movies);
      } else {
        console.log("영화 정보 가져오기 실패");
      }
    });
  }

  useEffect(() => {
    fetchFavoriteMovie();

    return () => {};
  }, []);
  const onClickDelete = (movieId,userFrom)=>{
    Axios.post('/api/favorite/removeFromFavorite',{
      movieId,
      userFrom,
    }).then(res=>{
      if(res.data.success){
        fetchFavoriteMovie();
      }else{
        console.log("favorite 삭제 실패")
      }
    })
  }
  

  const renderFavorites = Favorites.map((movie,index)=>{
    const content = (
      <div>
        {movie.moviePost ? 
          <img src = {`${process.env.REACT_APP_API_IMAGE_URL}w500${movie.moviePost}`}></img> : "no image"
        }
      </div>
    );
    return <Popover content={content} title={`${movie.movieTitle}`}>
    <tr key={index}>
      <td>{movie.movieTitle}</td>
      <td>{movie.movvieRunTime}</td>
      <td><button onClick={()=>onClickDelete(movie.movieId,movie.userFrom)}>Remove</button></td>
      </tr>
      </Popover>;
    
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from Favorite</th>
          </tr>
        </thead>
        <tbody>
          {renderFavorites}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
