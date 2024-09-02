import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("mongoDB is connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error; // Optionally, exit the process if the connection fails
  }
};

export default connectionDB;