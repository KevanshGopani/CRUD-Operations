// Buissines Logic

const User = require("../model/userModel");

exports.home = (req, res) => {
  res.send("Hello EveryOne");
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    //Check all the details
    if (!(name && email)) {
      throw new Error("Name and Email are required");
    }

    //User is exist or not
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      throw new Error("Email is already Exists");
    }

    const newuser = await User.create({ name, email });

    console.log(newuser);

    res.status(201).json({
      success: true,
      mesasge: "User Created Succesfully",
      newuser,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      mesasge: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
