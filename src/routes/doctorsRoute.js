import express from 'express';
import * as auth from "../middleware/auth.js";
import * as Doctor from '../controllers/doctorsController.js';

const router = express.Router();

router.post('/signup', Doctor.createDoctor);
router.get("/", Doctor.findAllDoctor);
// router.get("/:id", Doctor.findDoctorById);
router.get("/current-doctor", auth.auth, Doctor.getCurrentDoctor);
router.post("/login", Doctor.loginDoctor);
router.put("/:id", auth.auth, Doctor.updateDoctorById);
router.delete("/delete", auth.auth, Doctor.deleteDoctor);

export default router;