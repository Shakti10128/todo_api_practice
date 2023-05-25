import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select:false,
    }
})

export const userCollection = mongoose.model("UserCollection",userSchema);