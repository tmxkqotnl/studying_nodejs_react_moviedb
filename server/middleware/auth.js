const {User} = require('../models/User');

module.exports.auth = (req,res,next)=>{
  const token = req.cookies.w_auth;

  User.findByToken(token,(err,user)=>{
    if(err){
      console.error('auth 에러 발생');
      throw err;
    }

    if(!user){
      console.log('토큰으로 찾으려는 유저가 없습니다.');
      return res.json({
        isAuth:false,
        error:true,
      });
    }

    req.token = token;
    req.user = user;
    next();
  });
}