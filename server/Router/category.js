import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();


import * as category from "../controller/category.js"

router.get("/",category.getAll);

router.post("/",category.addCategory);
  
export default router;