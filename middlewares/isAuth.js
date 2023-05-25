import Jwt from 'jsonwebtoken';
import { userCollection } from '../Models/userModel.js';


export const isAuth = async(req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({
        succuss: false,
        message: "Login First",
      });
    }
  //   always give privete kye while decoding if set, else no need
    const decoded = Jwt.verify(token, process.env.PRIVATE_KEY);
    req.User = await userCollection.findById(decoded._id);
    next();
}