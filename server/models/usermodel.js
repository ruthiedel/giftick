import mongoose from '../config/mongoconnect.js';

const userSchema = new mongoose.Schema({

    name:String,
    email:String,
    phone:String,
    pin:String,
    package:[{name:String,price:Number,email:String}],
    picture:String
})

const userModel = mongoose.model("users",userSchema);
export default userModel;
