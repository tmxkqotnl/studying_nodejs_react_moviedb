const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber',(req,res)=>{
  Favorite.find({"movieId":req.body.movieId}).exec((err,movies)=>{
    if(err) return res.status(400).send(err);

    return res.status(200).json({
      success:true,
      favoriteNumber:movies.length,
    })
  });
});
router.post('/favorited',(req,res)=>{
  Favorite.find({movieId:req.body.movieId,userFrom:req.body.userFrom}).exec((err,movie)=>{
    if(err) return res.status(400).send(err);
    
    let result = false;
    if(movie.length!==0) result=true;

    return res.status(200).json({
      success:true,
      favorited:result,
    })
  });
});
router.post('/addtoFavorite',(req,res)=>{
  const newFavorite = new Favorite(req.body);
  newFavorite.save((err,favorite)=>{
    if(err) return res.status(400).json({
      err,
      success:false,
    })
    
    return res.status(200).json({
      success:true,
    })
  });
}); 
router.post('/removeFromFavorite',(req,res)=>{
  Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom}).exec((err,favorite)=>{
    if(err) return res.status(400).json({
      err,
      success:false,
    })

    return res.status(200).json({
      success:true,
    });
  });
});

router.post('/getFavoriteMovie',(req,res)=>{
  Favorite.find({userFrom:req.body.userFrom}).exec((err,movies)=>{
    if(err) return res.status(400).send(err);

    return res.status(200).json({
      success:true,
      movies
    });
  });
});

module.exports = router;