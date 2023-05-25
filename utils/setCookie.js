import Jwt from "jsonwebtoken";

export const setCookie = (user, res, message, statusCode = 200) => {
  const token = Jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    })
    .json({
      success: true,
      message,
    });
};
