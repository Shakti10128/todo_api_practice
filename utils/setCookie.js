import Jwt from "jsonwebtoken";

export const setCookie = (user, res, message, statusCode = 200) => {
  const token = Jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "devlopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "devlopment" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
