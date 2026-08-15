import express from 'express';
import {addItem, removeItem, showItems} from '../controllers/cart.controller.js'
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(auth ,showItems);

router.route('/add').post(auth ,addItem);

router.route('/remove/:productId').delete(auth ,removeItem);


export default router;