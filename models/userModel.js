import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// Hashing
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  // update user.. password modified nasel tr data save kara
  const salt = await bcrypt.genSalt(10); // 10 is the of encrytion on password
  this.password = await bcrypt.hash(this.password, salt);
}); // we create one user from postman and apply hashing on its passsword

// Compare Password
userSchema.methods.comparepassword = async function (userpassword) {
  const isMatch = await bcrypt.compare(userpassword, this.password);
  return isMatch;
};

// JSON Web token
userSchema.methods.createJWT = function () {
  // here we create method as "createJWT"
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
