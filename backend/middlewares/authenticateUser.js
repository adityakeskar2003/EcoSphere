import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token) ; 
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded token:", decoded);
      const user = await User.findById(decoded.userId);
      if (!user.verified) {
        return res
          .status(401)
          .json({ error: "Email is not verified.Please verify your email!" });
      }
      req.user = user
      req.userEmail = user.email;
      

      next();
    } catch (error) {
      res.status(401).json({
        error:
          "Authentication failed. Please check your credentials and try again!",
      });
      return;
    }
  } else {
    res.status(401).json({
      error: "You must be authenticated to access this resource {this is in authenticateUser.js}!",
    });
    return;
  }
});

export default authenticateUser;