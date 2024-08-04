
import {makeToken} from '../module/userToken.js'
import userModel from "../models/usermodel.js"

async function verefyUser(req,res)
{
    try {
        let data = await userModel.find({email:req.body.email,pin:req.body.pin});
        
        if(data.length === 0)
        {
          res.send("user is not in access");
        }
        else
        {
              const token = makeToken(data[0])
              res.send(token);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
}
export{
    
    verefyUser
}