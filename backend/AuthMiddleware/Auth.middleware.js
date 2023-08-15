import User from "../AuthModel/user.schema";
import JWT from "jsonwebtoken";
import asyncHandler from "../AuthServices/asyncHandler";
import CustomError from "../utiles/Auth.CustomError";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("Not authorized to access this page", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    //_id, find user based on the id, set this in req.user
    User.findById(decodedJwtPayload._id, "name email role");
  } catch (error) {
    throw new CustomError("Not authorised to access this page", 401);
  }
  next();
});
