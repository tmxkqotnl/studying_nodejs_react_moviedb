const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    // 패스워드 변경 및 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err_g, salt) {
      if (err_g) {
        console.error("generating salt error");
        return next(err_g);
      }
      bcrypt.hash(user.password, salt, (err_h, hash) => {
        if (err_h) {
          console.error("hashing error");
          return next(err_h);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    // 새로운 유저가 아니거나 패스워드 변겅이 아니라면
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      console.error("평문 및 암호화 패스워드 비교 에러");
      return cb(err);
    }
    cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb) {
  const user = this;
  console.log("스키마 정보 : ");
  console.log(user);
  console.log(userSchema);

  // generate jwt
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
  // token expiration period
  const anHour = moment().add(1, "hour").valueOf();

  user.token = token;
  user.tokenExp = anHour;
  user.save(function (err, user) {
    if (err) {
      console.error("토큰 저장 실패");
      return cb(err);
    }
    cb(null, user);
  });
};
userSchema.statics.findByToken = function (tk, cb) {
  const user = this;

  jwt.verify(tk, process.env.JWT_SECRET, function (err, decoded) {
    user.findOne({ _id: decoded, token: tk },function(err,user){
      if(err){
        console.error('토큰으로 유저 찾기 실패')
        cb(err);
      }
      cb(null,user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
