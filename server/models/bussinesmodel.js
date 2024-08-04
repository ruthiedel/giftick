import mongoose from '../config/mongoconnect.js';

const bussinesSchema = new mongoose.Schema({

    name:String,
    email:String,
    phone:String,
    picture:String,
    location:String,
    short_descreption:String,
    min_amount:Number,
    start_date:Date,
    years:Number,
    category:String
})


const bussinesModel = mongoose.model("bussinesses",bussinesSchema);
 export default bussinesModel;
