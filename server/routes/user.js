const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

/* 

      URL : /api/user 

*/

router.get("/auth", auth, (req, res) => {
  return res.json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      console.log("아이디 없음");
      return res.json({
        loginSuccess: false,
        message: "이메일이나 비밀번호를 다시 확인해주세요.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        console.log("비밀번호 틀림");
        return res.json({
          loginSuccess: false,
          message: "이메일이나 비밀번호를 다시 확인해주세요.",
        });
      }
      
      user.generateToken((err,user)=>{
        if(err){
          console.error('토큰 생성에 실패하였습니다.');
          res.state(400).send(err); // send 말고 다른 응답 방식은 ???????????????
        }
        res.cookie('w_authExp',user.tokenExp);
        res.cookie('w_auth', user.token);
        res.json({
          loginSuccess:true,
          userId:user._id,
        });
      });
    });
  });
});
router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      console.error("새로운 유저 저장 실패");
      return res.json({
        success: false,
        err,
      });
    }
    return res.json({
      success: true,
    });
  });
});

router.get('/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},{token:"",tokenExp:""},(err,user)=>{
    if(err){
      console.error('로그아웃 실패');
      return res.json({
        success:false,
        err,
      });
    }
    return res.send({
      success:true,
    })
  });
});

module.exports = router;
