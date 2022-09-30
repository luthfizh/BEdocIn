import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getenv from "../helper/getenv.js";
import User from "../models/usersModel.js";

const JWT_SECRET = getenv("JWT_SECRET");
const SALT = getenv("SALT");

export const findAllUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// export const findUserById = async (req, res, next) => {
//   try {
//     const id = mongoose.Types.ObjectId(req.params.id);
//     const response = await User.findById({ _id: id });
//     res.json({ response });
//   } catch (err) {
//     next(err);
//   }
// };

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      address: user.address,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(Number(SALT));
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });
    const result = await user.save();
    res.status(201).send({ message: "User successfully created!" });
  } catch (err) {
    if (["CastError", "ValidationError"].includes(err?.name)) {
      next({
        message: err.message,
        stack: err.stack,
        statusCode: 400,
      });
    }
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        errors: "Could not find this email!",
        error_type: "email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: "Invalid credentials!", error_type: "password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.json({
      token,
      user: {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      expiresIn: "2h",
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await User.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res
        .status(404)
        .send({ message: `Can't update, user with id=${id} not found!` });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "User successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete(req.user);
    if (!response) {
      res.status(404).send({ message: "Delete failed, user not found!" });
    } else {
      res.status(201).send({ message: "User successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
