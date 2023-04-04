const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profile_for: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  mother_tongue: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
