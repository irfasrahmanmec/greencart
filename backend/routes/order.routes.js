import express from 'express';
import authUser from '../middlewares/authUser.middleware.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/order.controller.js';
import authSeller from '../middlewares/authSeller.middleware.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;
