import express from 'express';
import {addItem, removeItem, showItems} from '../controllers/cartController.js'

const router = express.Router();

router.route('/:userId').get(showItems);

router.route('/add').post(addItem);

router.route('/remove/:productId').delete(removeItem);


export default router;