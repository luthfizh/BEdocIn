import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import Doctor from '../models/doctorsModel.js';

export const createDoctor = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const doctor = new Doctor({
      name: req.body.name,
      email: req.body.email,
      speciality: req.body.speciality,
      bio: req.body.bio,
      address: req.body.address,
      appointment_fee: req.body.appointment_fee,
      password: encryptedPassword
    });
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
    } else {
      res.status(201).send({ message: "Doctor successfully updated!" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const response = await Doctor.findByIdAndRemove({ _id: id });
    if (!response) {
      res
        .status(404)
        .send({ message: `Delete failed, doctor with id=${id} not found!` });
    } else {
      res.status(201).send({ message: "Doctor successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};