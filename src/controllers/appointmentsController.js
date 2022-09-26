import mongoose from 'mongoose';
import Appointment from '../models/appointmentsModel.js';

export const createDoctor = async (req, res, next) => {
  try {
    const appoinment = new Appointment(req.body);
    const result = await appoinment.save();
    res.status(201).send({ message: "Appointment successfully created!" });
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