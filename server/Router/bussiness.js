import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import * as bussiness from "../controller/bussiness.js";
import upload from '../Middlewares/upload.js';

router.get("/",bussiness.getAll)

router.get("/email/:email",bussiness.getByEmail)
router.get('/name/:name',bussiness.getByName)
router.get('/min_amount/:cost',bussiness.getByCost)
router.get("/category/:category/",bussiness.getByCategory)
router.get("/details",bussiness.getByDetails)
router.get("/picture/:email",bussiness.getPicture)
router.post("/",upload.single('picture'),bussiness.addBussiness)
router.delete("/",bussiness.deleteBussiness)
  
export default router;