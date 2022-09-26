import mongoose from 'mongoose';
import Doctor from '../models/doctorsModel.js';

export const createDoctor = async (req, res, next) => {
  try {
    const doctor = new Doctor(req.body);
    const result = await doctor.save();
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