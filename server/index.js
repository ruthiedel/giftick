import express from 'express';
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import user from "./Router/user.js"
import signin from "./Router/signin.js"
import bussiness from "./Router/bussiness.js"
import login from "./Router/login.js"
import email from "./Router/email.js"
import category from "./Router/category.js"
import buy from "./Router/buy.js"
import * as  VerifyToken  from './middlewares/verifyUserToken.js'



 const app = express(); //מופע מסוג הקספרסס
 const port = 3000;
//מאפשר למשתמש חיצוני ליצא מידע
 var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  



  app.use("/category",category)
 
  app.use('/bussiness',bussiness)

  app.use('/user',VerifyToken.verifyToken,user)

  app.use('/login',login)

  app.use('/signin',signin);

  app.use('/buy',buy)

  app.use("/email",email)


  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
