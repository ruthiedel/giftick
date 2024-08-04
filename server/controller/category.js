import categoryModel from "../models/ctegorymodel.js"


async function getAll(req,res)
{
    
    try {
     
      let data = await categoryModel.find({});
    
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }

}

async function addCategory(req,res)
{
  let b = req.body;
 
  let category = new categoryModel(b)
  try {
      let data = await categoryModel.find({name:req.body.name});
      console.log(data);
      if(data.length===0)
      {
         await category.save(); 
         res.status(200).send('add category success').end()
      }
      else
      {
          res.send("addcategory failed because this category is already in the DB")
      }
  } 
  catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
  }
}

export{
    getAll,
    addCategory
}