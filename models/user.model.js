import { Timestamp } from "mongodb";
import mongoose from "mongoose";
 // schema is smome condition
const userSchema = new mongoose.Schema({
    userSchema:{
        type: String,
        require: true,
        unique : true,
    },
    email:{
        type: String,
        require: true,
        unique : true,
    },
    password:{
        type: String,
        require: true,
    }
} ,{ timestamps : true });

const User =  mongoose.model('User',userSchema);
export default User;