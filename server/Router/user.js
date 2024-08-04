import express from 'express'

const router = express.Router();

import * as users from "../controller/user.js"

 router.get("/",users.getUser)
 router.get("/email",users.getUseremail)
 router.put("/",users.UpdateUser)

  
export default router;