 import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import fs from "fs";

import * as signin from "../Controller/signin.js"


router.post("/",signin.addUser)
  
export default router;