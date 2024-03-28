// import { compare } from "bcryptjs";
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  // try {
  const { name, email, password } = req.body;
  if (!name) {
    next("Name is required"); // validation

    //before validation
    // return res.status(404).send({
    //   success: false,
    //   message: "Please enter name",
    // });
  }
  if (!email) {
    next("email is required"); // validation

    // return res.status(404).send({
    //   success: false,
    //   message: "Please enter email",
    // });
  }
  if (!password) {
    next("password is required"); // validation

    // return res.status(404).send({
    //   success: false,
    //   message: "Please enter password",
    // });
  }

  const existinguser = await userModel.findOne({ email });
  if (existinguser) {
    return res.status(404).send({
      success: false,
      message: "Already registered! Please login",
    });
  }

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  return res.status(201).send({
    success: true,
    message: "User created succesfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
  // } catch (error) {
  // console.log(error);
  // next(error);
  // res.send({
  //   success: false,
  //   message: "Error in register controller",
  //   error,
  // });
  // }
};

// export default registerController;

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email) {
    next("Enter correct Email");
  }
  if (!password) {
    next("Enter correct password");
  }

  // find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    // next("Invalid email and password");
    return res.send({
      success: false,
      message: "Invalid email and password",
    });
  }

  // compare password
  const isMatch = await user.comparepassword(password);
  if (!isMatch) {
    // next("Invalid email and password");
    return res.send({
      success: false,
      message: "Invalid email and password",
    });
  }

  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully done!",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
