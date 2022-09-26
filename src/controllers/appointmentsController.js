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

export const updateAppointmentById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res
        .status(404)
        .send({ message: `Can't update, appointment with id=${id} not found!` });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Appointment successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteAppointmentById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findByIdAndRemove({ _id: id });
    if (!response) {
      res
        .status(404)
        .send({ message: `Delete failed, appointment with id=${id} not found!` });
    } else {
      res.status(201).send({ message: "Appointment successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
}
