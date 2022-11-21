import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getenv from "../helper/getenv.js";
import Doctor from "../models/doctorsModel.js";

const JWT_SECRET = getenv("JWT_SECRET");
const SALT = getenv("SALT");

export const createDoctor = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(Number(SALT));
    const encryptedPassword = bcrypt.hashSync(
      req.body.password,
      salt,
      (err, hash) => {
        console.log(err);
      }
    );
    const doctor = new Doctor({
      name: req.body.name,
      email: req.body.email,
      speciality: req.body.speciality,
      bio: req.body.bio,
      address: req.body.address,
      appointmentFee: req.body.appointmentFee,
      password: encryptedPassword,
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

export const getCurrentDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.user);
    res.json({
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      speciality: doctor.speciality,
      bio: doctor.bio,
      address: doctor.address,
      appointmentFee: doctor.appointmentFee,
    });
  } catch (err) {
    next(err);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(400).json({
        errors: "Could not find this email!",
        error_type: "email",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: "Invalid credentials!", error_type: "password" });
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        bio: doctor.bio,
        address: doctor.address,
        appointmentFee: doctor.appointmentFee,
      },
      JWT_SECRET
    );
    res.json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        bio: doctor.bio,
        address: doctor.address,
        appointmentFee: doctor.appointmentFee,
      },
      expiresIn: "2h",
    });
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
    const response = await Doctor.findByIdAndDelete(req.user);
    if (!response) {
      res.status(404).send({ message: "Delete failed, doctor not found!" });
    } else {
      res.status(201).send({ message: "Doctor successfully deleted!" });
    }
  } catch (err) {
    next(err);
  }
};
