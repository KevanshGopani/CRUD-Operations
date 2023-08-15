const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useunifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Connected DB: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.log("Issue in DB Connection");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = connectToDB;
