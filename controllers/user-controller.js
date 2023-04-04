const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SignUp
const signup = async (req, res, next) => {
  const { profile_for, name, dob, religion, mother_tongue, user_id, password } =
    req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ user_id });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }
  let hashedPassword = bcryptjs.hashSync(password);
  const user = new User({
    profile_for,
    name,
    dob,
    religion,
    mother_tongue,
    user_id,
    password: hashedPassword,
  });
  // var userObj = JSON.parse(user);
  //userObj.dob = new Date(userObj.dob);

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ user });
  //res.send({ user: savedUser._id });
};

//Get All Users

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

//Login
const login = async (req, res, next) => {
  let existingUser;
  const { user_id, password } = req.body;
  try {
    existingUser = await User.findOne({ user_id });
  } catch (err) {
    console.log("Something went wrong !!", err);
  }
  if (existingUser) {
    console.log("User Email ID Exists", existingUser.password);
    const passwordCmpre = bcrypt.compareSync(password, existingUser.password);
    if (passwordCmpre) {
      return res.status(200).json({ messgae: "Login Successfull" });
    } else {
      return res.status(405).json({ message: "Password doesn't match" });
    }
  } else {
    console.log("User id doesn't exists");
    return res.status(404).send({ message: "User Id doesn't exists" });
  }
};

module.exports = { signup, getAllUsers, login };
