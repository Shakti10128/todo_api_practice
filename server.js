import { app } from "./app.js";
import {connectDB} from './Database/dataBase.js'


connectDB();

app.listen(process.env.PORT,()=>{
    console.log("server start on PORT: ",process.env.PORT,` in ${process.env.NODE_ENV} mode`);
})