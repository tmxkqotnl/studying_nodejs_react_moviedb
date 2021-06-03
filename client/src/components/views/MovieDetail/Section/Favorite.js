import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const req = {
    userFrom,
    movieId,
  }
  const reqFavorite = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  }

  const onClickFavorite = ()=>{
    if(Favorited){
      Axios.post('/api/favorite/removeFromFavorite',req).then(res=>{
        if(res.data.success){
          setFavoriteNumber(FavoriteNumber-1);
          setFavorited(!Favorited);
        }else{
          console.error('favorite 지우기 실패');
        }
      })
    }else{
      Axios.post('/api/favorite/addtoFavorite',reqFavorite).then(res=>{
        if(res.data.success){
          setFavoriteNumber(FavoriteNumber+1);
          setFavorited(!Favorited);
        }else{
          console.error('favorite 추가 실패');
        }
      })
    }
  }

  useEffect(() => { 
    
    Axios.post(`/api/favorite/favoriteNumber`,req).then(res=>{
      if(res.data.success){
        console.log(res.data);
        setFavoriteNumber(res.data.favoriteNumber);
      }else{
        console.error("FavoriteNumber 정보 통신 실패");
      }
    })

    Axios.post(`/api/favorite/favorited`,req).then(res=>{
      if(res.data.success){
        console.log(res.data);
        setFavorited(res.data.favorited);
      }else{
        console.error("Favorited 정보 통신 실패");
      }
    })
    return () => {
    }
  }, [])
  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite
