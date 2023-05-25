import mongoose from "mongoose";

export const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGOOSE_URL,{
            dbName:"Todo_api_practice"
        }).then((c)=>{
            console.log(`database connected with ${c.connection.host}`);
        })
    } catch (error) {
        console.log(error);
    }
}