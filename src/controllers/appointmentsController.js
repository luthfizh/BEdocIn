import mongoose from "mongoose";
import Appointment from "../models/appointmentsModel.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = new Appointment({
      creator_id: req.user,
      receiver_id: req.body.receiver_id,
      creator_name: req.user,
      receiver_name: req.body.receiver_id,
      subject: req.body.subject,
      explanation: req.body.explanation,
      date: req.body.date,
      time: req.body.time,
      appointmentFee: req.body.appointmentFee,
    });
    const result = await appointment.save();
    if (result) {
      res.status(201).send({ message: "Appointment successfully created!" });
    } else {
      res.status(404).send({ message: "Appointment cannot be empty!" });
    }
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

export const getUserRequest = async (req, res, next) => {
  const { creator_id } = req.query;
  try {
    const appointments = await Appointment.find({
      creator_id: creator_id,
    })
      .populate({ path: "creator_name", select: "-_id firstName lastName" })
      .populate({ path: "receiver_name", select: "-_id name" });
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

export const getDoctorRequest = async (req, res, next) => {
  const { receiver_id } = req.query;
  try {
    const appointments = await Appointment.find({
      receiver_id: receiver_id,
    })
      .populate({ path: "creator_name", select: "-_id firstName lastName" })
      .populate({ path: "receiver_name", select: "-_id name" });
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

export const findAllAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.find({})
      .populate({ path: "creator_name", select: "-_id firstName lastName" })
      .populate({ path: "receiver_name", select: "-_id name" });
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
      res.status(404).send({
        message: `Can't update, appointment with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Appointment successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findByIdAndUpdate(
      { _id: id },
      {
        fee_status: req.body.fee_status,
      }
    );
    if (!response) {
      res.status(404).send({
        message: `Can't update, appointment with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res.status(201).send({ message: "Payment status successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const acceptRequestDoctor = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findByIdAndUpdate(
      { _id: id },
      {
        status: req.body.status,
      }
    );
    if (!response) {
      res.status(404).send({
        message: `Can't update, appointment with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res
        .status(201)
        .send({ message: "Appointment status successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const rejectRequestDoctor = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Appointment.findByIdAndUpdate(
      { _id: id },
      {
        status: req.body.status,
      }
    );
    if (!response) {
      res.status(404).send({
        message: `Can't update, appointment with id=${id} not found!`,
      });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
    } else {
      res
        .status(201)
        .send({ message: "Appointment status successfully updated!" });
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
      res.status(404).send({
        message: `Delete failed, appointment with id=${id} not found!`,
      });
    } else {
      res.status(201).send({ message: "Appointment successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
