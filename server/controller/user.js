  import fs from 'fs';
  import userModel from "../models/usermodel.js"

  async function getUser(req, res) {
    try {
      let data = await userModel.find({});
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function getUseremail(req,res)
  {
    try {
      let data = await userModel.find({email:req.user.user_email});
      console.log(req.user)
      if(data.length === 0)
      {
       
        res.send("Not in access")
      }
      else{
      res.send(data[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}




async function UpdateUser(req,res)
{
 
  console.log(req.body.email);
  console.log(req.body);
  try {
    let data = await userModel.find({email:req.body.email});
    
    if(data.length === 0)
    {
    
      res.send("not in access")
    }
    else{
      await userModel.updateOne({email: req.body.email}, req.body);

       res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

export{
    getUser,
    getUseremail,
    UpdateUser
}