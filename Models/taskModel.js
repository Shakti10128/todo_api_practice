import mongoose, { model } from "mongoose";


const taskSchema = mongoose.Schema({
    title:{
        require:true,
        type:String
    },
    description:{
        require:true,
        type:String
    },
    isComplete:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"userCollection"
    }
})

export const taskCollection =  mongoose.model("TaskCollection",taskSchema);