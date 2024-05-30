import express from 'express';
import {getNotification,markReadNotification} from '../controller/notificationController.js'
import { authenticateToken } from '../controller/jwtMiddleware.js';
const notificationRouter=express.Router();
notificationRouter.get('/notification',authenticateToken,getNotification);
notificationRouter.post('/notification/mark-read',authenticateToken,markReadNotification);
export default notificationRouter;