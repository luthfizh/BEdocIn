import mongoose from 'mongoose';
import Doctor from '../models/doctorsModel.js';

export const createDoctor = async (req, res, next) => {
  try {
    const doctor = new Doctor(req.body);
    const result = await doctor.save();
    res.status(201).send({ message: "Doctor successfully created!" });
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

export const findAllDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.find({});
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

export const findDoctorById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Doctor.findById({ _id: id });
    res.json({ response });
  } catch (err) {
    next(err);
  }
};

export const updateDoctorById = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Doctor.findByIdAndUpdate({ _id: id }, req.body);
    if (!response) {
      res
        .status(404)
        .send({ message: `Can't update, doctor with id=${id} not found!` });
    } else if (Object.keys(req.body).length === 0) {
      res.status(404).send({ message: "Can't update, update value is empty!" });
      res.status(201).send({ message: "Doctor successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};