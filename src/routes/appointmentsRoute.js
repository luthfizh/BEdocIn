import express from "express";
import * as Appointment from "../controllers/appointmentsController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create-request", auth.auth, Appointment.createAppointment);
router.get("/user-request", auth.auth, Appointment.getUserRequest);
router.get("/doctor-request", auth.auth, Appointment.getDoctorRequest);
router.get("/", Appointment.findAllAppointment);
router.get("/:id", Appointment.findAppointmentById);
router.put("/:id", Appointment.updateAppointmentById);
router.put(
  "/update-payment-status/:id",
  auth.auth,
  Appointment.updatePaymentStatus
);
router.put("/accept/:id", auth.auth, Appointment.acceptRequestDoctor);
router.delete("/:id", Appointment.deleteAppointmentById);

export default router;
