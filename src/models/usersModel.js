import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 3,
    max: 200,
  },
  last_name: {
    type: String,
    required: true,
    min: 3,
    max: 200,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  address: {
    type: String,
    default: "Yogyakarta, Indonesia",
  },
  role: {
    type: String,
    default: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
