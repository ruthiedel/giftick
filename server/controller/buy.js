import {makeToken} from "../module/emailToken.js"
import bussinesModel from "../models/bussinesmodel.js"


function makeCard(req,res)
{
  const token =  makeToken(req.body.cardCvv,req.body.cardExpiry,req.body.cardNumber)
  res.status(200).send(token).end()
}
export{
    makeCard
}