import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  if (!user) {
    res.send("User not found");
  }
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

// import userModel from "../models/userModel.js";

// export const updateUserController = async (req, res, next) => {
//   const { name, email, lastName, location } = req.body;

//   // Check if all required fields are provided
//   if (!name || !email || !lastName || !location) {
//     return res.status(400).json({ error: "Please Provide All Fields" });
//   }

//   try {
//     // Attempt to find the user by ID
//     const user = await userModel.findOne({ _id: req.user.userId });

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Update user properties
//     user.name = name;
//     user.lastName = lastName;
//     user.email = email;
//     user.location = location;

//     // Save the updates to the database
//     await user.save();

//     // Generate a new JWT for the updated user
//     const token = user.createJWT();

//     // Send back the updated user data and new token
//     res.status(200).json({
//       user,
//       token,
//     });
//   } catch (error) {
//     // Pass any errors to the error-handling middleware
//     next(error);
//   }
// };
