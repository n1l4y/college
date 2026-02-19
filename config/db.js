import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nilay:ecomm@cluster0.gdyuc.mongodb.net/ecomm?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB Connected"));
};
