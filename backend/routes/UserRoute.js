//URL PATH

const express = require("express");
const router = express.Router();

const {
  home,
  createUser,
  editUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

router.get("/", home);
router.post("/createuser", createUser);
router.get("/getusers", getUsers);
router.put("/edituser/:id", editUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
