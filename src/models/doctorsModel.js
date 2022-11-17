import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  },
  speciality: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 255,
  },
  bio: {
    type: String,
    default: "Hi, I am doctor at Docin",
  },
  address: {
    type: String,
    default: "Yogyakarta, Indonesia",
  },
  appointment_fee: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "Doctor",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
