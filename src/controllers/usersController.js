import mongoose from 'mongoose';
import User from '../models/usersModel.js';

export const findAllUser = async (req, res, next) => {
    try {
      const user = await User.find({});
  
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

export const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
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