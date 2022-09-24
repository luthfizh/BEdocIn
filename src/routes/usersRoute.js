import express from 'express';
import * as User from '../controllers/usersController.js';

const router = express.Router();

router.get('/', User.findAllUser);
router.post('/', User.createUser);

export default router;