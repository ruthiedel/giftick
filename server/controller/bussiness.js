import fs from 'fs'; 
import path from 'path';
import bussinesModel from "../models/bussinesmodel.js"


async function getAll(req,res)
{ 
    try {    
      let data = await bussinesModel.find({});
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }

}

async function addBussiness(req,res)
{
  let b = req.body;
  console.log(req.body)
 
  let bussiness = new bussinesModel(b)
  try {
      let data = await bussinesModel.find({email:req.body.email});
      console.log(data);
      if(data.length===0)
      {
        console.log(bussiness);
         await bussiness.save(); 
         res.status(200).send('add busssiness success').end()
      }
      else
      {
          res.send("addbusiness failed because this business is already in the DB")
      }
  } 
  catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
  }
}


async function getByName(req,res)
{
    try {
      let data = await bussinesModel.find({name:req.params.name});
   
      if(data.length === 0)
      {
       
        res.send("Not in access")
      }
      else{
      res.send(data);
      }
    } catch (error) {

      res.status(500).send('Internal Server Error');
    }
}


async function getByEmail(req,res)
{
    try {
      let data = await bussinesModel.find({email:req.params.email});      
      if(data.length === 0)
      {
        res.send("Not in access")
      }
      else{
      res.send(data[0]);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
}


async function getByCost(req, res) {
  try {
    let data = await bussinesModel.find({ min_amount: { $lte: req.params.cost } });
    if (data.length === 0) 
    {
      res.send("Not in access");
    } else {
      res.send(data);
    }
  } 
  catch (error) {
    res.status(500).send('Internal Server Error');
  }
}


 async function deleteBussiness(req,res)
 {
   try{
       await bussinesModel.deleteOne({"email":req.body.email})
       res.send("remove bussiness successed")
   }
   catch(error)
   {

    res.status(500).send('Internal Server Error');
   }
 }

async function getPicture(req,res)
{
  try{
    let data = await bussinesModel.find({email:req.params.email})
    if(data.length===0)
    {
      res.send("not in access");
    }
    else
    {
      try{
      res.set('Content-Type', 'image/jpg');
      res.sendFile(path.resolve('./pictures/' + data[0].picture));
    }
    catch(error)
    {
      res.status(500).send("There was a problem loading the picture");
    }
      
    }
  }
  catch(error)
  {
    res.status(500).send('Internal Server Error');
  }
}



async function getByDetails(req, res) {
  try {
    const { amount, name, category } = req.query;
    const query = {};
    if (amount !=="?") {
      query.min_amount = { $lte: amount };
    }
    if (name !== "?") {
      query.name = name;
    }

    if (category !== "?") {
      query.category = category;
    }
  console.log(query)
  if(Object.keys(query).length>0)
     {
      const data = await bussinesModel.find(query);
     

    if (data.length === 0) {
      res.send("Not in access");
    } 
    else {
      res.send(data);
    }
  }
  else{
    res.send("give us more details")
  }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}



async function getByCategory(req,res)
{
    try {
      
      let data = await bussinesModel.find({category:(req.params.category+" ")});
      console.log(req.params.category);
      if(data.length === 0)
      {
       
        res.send("Not in access")
      }
      else{
      res.send(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}



export{
    getAll,
    addBussiness,
    getByEmail,
    getByName,
    getByCost,
    deleteBussiness,
    getPicture,
    getByCategory,
    getByDetails
}
 

