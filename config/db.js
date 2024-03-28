import mongoose from "mongoose";
// import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    // console.log(`Connected to mongoDB database ${mongoose.connection.host} `);
    // console.log(conn);  There are so many methods inside that variable
  } catch (error) {
    console.log(` Error is: ${error}`);
  }
};

export default connectDB;
