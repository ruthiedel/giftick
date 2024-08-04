import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import fs from "fs";

import * as login from "../Controller/login.js"

// router.get("/",login.getloginpage)
router.post("/",login.verefyUser)
  
export default router;