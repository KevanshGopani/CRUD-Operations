// const express = require("express");
// const app = express();

// require("dotenv").config();

// const UserRoute = require("./routes/UserRoute");

// //MIDDLEWARE
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const connectToDB = require("./config/db");
// connectToDB();

// app.use("/", UserRoute);

// module.exports = app;

//-------AUTH-------------------------

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //Security- Nobody can send req to backend
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//morgnan logger
app.use(morgan("tiny"));

export default app;
