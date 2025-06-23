import express from 'express';
import { isUserAuth, login, logout, register } from '../controllers/user.Controller.js';
import authUser from '../middlewares/authUser.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isUserAuth)
userRouter.get('/logout', authUser, logout)

export default userRouter;