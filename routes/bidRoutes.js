import express from 'express';
import { getAllbid,placeNewBid } from '../controller/bidcontroller.js';
import { authenticateToken } from '../controller/jwtMiddleware.js';
const bidRouter=express.Router();
bidRouter.get('/items/:itemId/bids',getAllbid);
bidRouter.post('/items/:itemId/bids',authenticateToken,placeNewBid);
export default bidRouter;