import express from 'express';
import * as Doctor from '../controllers/doctorsController.js';

const router = express.Router();

router.post('/', Doctor.createDoctor);

export default router;