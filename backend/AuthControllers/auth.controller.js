import User from "../AuthModel/user.schema";
import asyncHandler from "../AuthServices/asyncHandler";
import CustomError from "../utiles/Auth.CustomError";
import mailHelper from "../utils/mailHelper";
import crypto from "../utils/crypto";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  //Couldbe in a separate file in utils
};

/****************
@SIGNUP
@route http://localhost:4000/api/auth/signup
@descriptions User signup controller for creating a new user
@parameters name,email,password
@returns User Object
************************/

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Please fill all the fields", 400);
  }
  //check if the user is already exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exist", 400);
  }

  const user = await User.create({ name, email, password });

  const token = user.getJwtToken();
  console.log(user);
  user.password = undefined;

  res.cookie("token", token, cookieOptions);
  res.status(201).json({
    success: true,
    token,
    user,
  });
});

/****************
@LOGIN
@route http://localhost:4000/api/auth/login
@descriptions User login controller for creating a login new user
@parameters name,email,password
@returns User Object
************************/

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please fill all the fields", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  throw new CustomError("Invalid Credentials - Password", 400);
});

/****************
@LOGOUT
@route http://localhost:4000/api/auth/logout
@descriptions User logout by clearing cookie
@parameters name,email,password
@returns Success response
************************/

export const logout = asyncHandler(async (_req, res) => {
  // res.clearCookie("token");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

/****************
@FORGOT_PASSWORD
@route http://localhost:4000/api/auth/password/forget
@descriptions User will submit email ans we will generate a token
@parameters name,email,password
@returns Success response - Email Send
************************/

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  //Chack the email or null

  const user = User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const resetToken = user.generateForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${re.protocol}://${req.get(
    "host"
  )}/api/auth/password/reset/${resetToken}`;

  const text = `Your password reset url is 
  /n/n ${resetUrl}\n\n`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Password reset",
      text: text,
    });

    res.status(200).json({
      success: true,
      message: "Email send to ${user.email",
    });
  } catch (error) {
    //clear field and save

    user.generateForgotPasswordToken = undefined;
    user.generateForgotPasswordExpiry = undefined;

    throw new CustomError(error.message || "Email sent Failure");
  }
});

/****************
@RESET_PASSWORD
@route http://localhost:4000/api/auth/password/reset/:resetPasswordToken
@descriptions User will able to redet password based onn url token
@parameters token from url, password and conform password
@returns user object
************************/

export const resetPassword = asyncHandler(async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassword)
    .digest("hex");

  const user = User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("Password Token is invalid or expires", 400);
  }

  if (passwordToken !== confirmPassword) {
    throw new CustomError("Passwords do not match", 400);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  //create token and send it to the user

  const token = user.getJwtToken();
  user.password = undefined;

  //helper method for cookie can be added

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    token,
    user,
  });
});

//TODO: create a controller for chnage Password

/****************
@GET_PROFILE
@route http://localhost:4000/api/auth/profile
@descriptions check for token and populate req.user
@parameters token from url, password and conform password
@returns user object
************************/

export const getProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
