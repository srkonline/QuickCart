import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{type: String, required:true},
    name:{ type: String, required:true },
    email:{ type: String, required:true, unique:true },
    imageUrl:{ type: String, required:true },
    cartItems:{ type:Object, default:{ } },
},{minimize:false})

const User = Mongoose.models.user || mongoose.model('user',userSchema)

export default User