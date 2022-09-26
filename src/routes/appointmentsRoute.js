import express from 'express';
import * as Appointment from '../controllers/appointmentsController.js';

const router = express.Router();

router.post('/', Appointment.createAppointment);
router.get("/", Appointment.findAllAppointment);
router.get("/:id", Appointment.findAppointmentById);
router.put("/:id", Appointment.updateAppointmentById);
router.delete("/:id", Appointment.deleteAppointmentById);

export default router;