import express from 'express';
import { auth } from '../middleware/auth.js';
import {createOrder} from '../controllers/order.controller.js';

const router = express.Router();

router.route('/').post(auth ,createOrder);

export default router;