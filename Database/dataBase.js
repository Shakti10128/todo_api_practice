import mongoose from "mongoose";

export const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGOOSE_URL,{
            dbName:"Todo_api_practice"
        }).then(()=>{
            console.log("database connected successfully");
        })
    } catch (error) {
        console.log(error);
    }
}