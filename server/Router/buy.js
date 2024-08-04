import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();


import * as buy from "../controller/buy.js"


router.post("/",buy.makeCard);
  
export default router;