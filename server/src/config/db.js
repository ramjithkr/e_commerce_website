import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to to db");
  } catch (error) {
    console.log("error connecting to Mongo");
  }
};

export default connectdb;
