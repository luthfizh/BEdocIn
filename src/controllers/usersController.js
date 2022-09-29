import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/usersModel.js";

export const findAllUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const findUserById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await User.findById({ _id: id });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword});
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
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await User.findByIdAndRemove({ _id: id });
    if (!response) {
      res
        .status(404)
        .send({ message: `Delete failed, user with id=${id} not found!` });
    } else {
      res.status(201).send({ message: "User successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
