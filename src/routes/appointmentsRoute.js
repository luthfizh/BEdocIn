import express from "express";
import * as Appointment from "../controllers/appointmentsController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-request", auth.auth, Appointment.createAppointment);
router.get("/user-request", auth.auth, Appointment.getUserRequest);
router.get("/", Appointment.findAllAppointment);
router.get("/:id", Appointment.findAppointmentById);
router.put("/:id", Appointment.updateAppointmentById);
router.delete("/:id", Appointment.deleteAppointmentById);

export default router;
