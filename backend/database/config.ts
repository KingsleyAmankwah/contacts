import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    const conn = await mongoose.connect(uri);
    console.log(
      colors.cyan.underline.bold(
        `MongoDB Connected: ${conn.connection.host}🔥🎉😎`
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
