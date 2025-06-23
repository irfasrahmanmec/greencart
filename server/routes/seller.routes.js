import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/seller.Controller.js';
import authSeller from '../middlewares/authSeller.middleware.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth',authSeller, isSellerAuth);
sellerRouter.get('/logout', sellerLogout);

export default sellerRouter;