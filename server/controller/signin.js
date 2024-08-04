import fs from 'fs';
import {makeToken} from '../module/userToken.js'
import userModel from "../models/usermodel.js"




   
async function addUser(req,res)
{
    let u = req.body;
    u.package =[]
    const token = makeToken(u); 
    let user = new userModel(u)
    try {
        let data = await userModel.find({email:req.body.email});
        console.log(data);
        if(data.length===0)
        {
           await user.save(); 
           res.status(200).send(token).end()
        }
        else
        {
            res.send("adduser failed because this user is allready in the DB")
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
}


 export{
          addUser
       }