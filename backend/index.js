import mongoose from "mongoose";
import app from "./app";
import config from "./AuthConfig/index";

async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB connection established");
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    const onListening = () => {
      console.log(`Listening on ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
};
