import mongoose from "mongoose";
import AuthRole from "../utiles/AuthRole";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../AuthConfig/index";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be Required"],
      maxLength: [50, "Name must be at least 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must be Required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password must be Required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRole),
      default: AuthRole.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

//Task-1 : encrypt password
userSchema.pre("save", async function (next) {
  if (!this.modified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//add more features directly to your schema
userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //generate JWT token

  getJwtToken: async function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      config.JWT_SECRATE,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },

  generateForgotPasswordToken: async function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");
    //Step 1: Save to DATABASE
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    this.forgotPasswordExpirey = Date.now() + 20 * 60 * 1000;
    //Step 2: return values to user
    return forgotToken;
  },
};

export default mongoose.model("User", userSchema);
