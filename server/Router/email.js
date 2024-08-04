import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();

import * as VerifyToken from "../middlewares/verifyEmailToken.js"

import * as email from "../controller/email.js";


router.post("/client",VerifyToken.verifyToken,email.sendEmailToClient)
router.post("/bussiness",email.sendEmailToClient)

export default router;