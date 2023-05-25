import { userCollection } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";

/*-----------------------------------get user------------------------------*/
export const getUser = (req, res, next) => {
  try {
    res.json({
        success: true,
        user: req.User,
      });
  } catch (error) {
    next(error);
  }
};
/*--------------------------------create user------------------------------*/

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userCollection.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await userCollection.create({ name, email, password: hashPassword });
    // setting up cookie for browser
    setCookie(user, res, "User creates successfully", 201);
  } catch (error) {
    next(error);
  }
};

/*-----------------------------------Login user------------------------------*/
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    setCookie(user, res, `welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

/*-------------------------------- logout ---------------------------------*/
export const logOut = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "devlopment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "devlopment" ? false : true,
      })
      .json({
        succuss: true,
        messaeg: "Log Out Successfully",
      });
  } catch (error) {
    next(error);
  }
};
