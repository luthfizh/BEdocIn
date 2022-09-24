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

  export const findUserById = async (req, res, next) => {
    try {
      // code here
      const id = mongoose.Types.ObjectId(req.params.id);

      const response = await User.findOne({ _id: id });
      res.json({ response });
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

export const updateUserById = async (req, res, next) => {
  // try {
  //   // code here
  //   const id = mongoose.Types.ObjectId(req.params.id);

  //   const response = await User.updateOne({ _id: id });
  //   res.json({ response });
  // } catch (err) {
  //   next(err);
  // }

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "Data User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
    // try {
    //   const result = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     if (!data) {
    //       res.status(404).send({
    //         message: `Cannot update User with id=${id}. Maybe User was not found!`
    //       });
    //     } else res.send({ message: "Data User was updated successfully." });
    
    // } catch (error) {
    //   res.status(500).send({
    //     message: "Error updating User with id=" + id
    //   });
    // }
};