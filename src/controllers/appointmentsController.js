import mongoose from 'mongoose';
import Appointment from '../models/appointmentsModel.js';

export const createAppointment = async (req, res, next) => {
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

export const findAllAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.find({});
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const findAppointmentById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findById({ _id: id });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};