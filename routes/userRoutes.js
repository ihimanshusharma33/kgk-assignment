import express from 'express';
import { registerUser,loginUser,profile } from '../controller/userController.js';
import {authenticateToken} from '../controller/jwtMiddleware.js'
const userRouter=express.Router();
userRouter.post('/users/register',registerUser);
userRouter.post('/users/login',loginUser);
userRouter.get('/users/profile',authenticateToken,profile);
export default userRouter;