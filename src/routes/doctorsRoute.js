import express from 'express';
import * as Doctor from '../controllers/doctorsController.js';

const router = express.Router();

router.post('/signup', Doctor.createDoctor);
router.get("/", Doctor.findAllDoctor);
router.get("/:id", Doctor.findDoctorById);
router.put("/:id", Doctor.updateDoctorById);
router.delete("/delete/:id", Doctor.deleteDoctor);

export default router;