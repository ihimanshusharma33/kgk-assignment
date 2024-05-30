import express from 'express';
import {getAllAuction,getAuctionbyId,creataAuction,updateAuction,deleteAuction} from '../controller/auctionController.js'
import { authenticateToken } from '../controller/jwtMiddleware.js';
const itemsRouter=express.Router();
itemsRouter.get('/items',getAllAuction);
itemsRouter.get('/items/:id',getAuctionbyId);
itemsRouter.post('/items',authenticateToken,creataAuction);
itemsRouter.put('/items/:id',authenticateToken,updateAuction);
itemsRouter.delete('/items/:id',authenticateToken,deleteAuction);
export default itemsRouter;