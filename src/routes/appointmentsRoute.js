import express from 'express';
import * as Appointment from '../controllers/appointmentsController.js';

const router = express.Router();

router.post('/', Appointment.createDoctor);

export default router;