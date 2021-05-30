const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const {MONGO_URI} = require('./config/Key');

const apiUserRouter = require('./routes/user');

dotenv.config();

const server = async () =>{
  try{
  let dbConnection = await mongoose.connect(MONGO_URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useNewUrlParser:true
  });
  console.log('DB is connected');

  app.set('port',process.env.PORT);
  app.use(express.urlencoded({extended:true}));
  app.use(process.env.NODE_ENV === "production" ? morgan('combined') : morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/user', apiUserRouter);
  app.use('/uploads', express.static('uploads'));
  
  // 배포 시 클라이언트에게 서버가 줄 모든 데이터가 있는 디렉토리 설정
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }

  app.use((req,res,next)=>{
    const err = new Error('NOT FOUND THE PAGE');
    res.status(404);
    next(err);
  });
  app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    console.log('라우터에서 에러를 처리합니다... ERROR : ');
    console.log(err.message);
  });

  app.listen(app.get('port'),()=>{
    console.log('포트 번호 '+app.get('port')+' 통신중');
  });
  }catch(err){
    console.log('데이터베이스 또는 서버 에러');
    console.error(err);
  }
}

