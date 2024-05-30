import express from 'express' // import express for creating server
import cors from 'cors'; // import cors for cross origin request
import bodyParser from 'body-parser'; // import body parser for parsing incoming request
import userRouter from './routes/userRoutes.js';// import user router for user routes
import itemsRouter from './routes/auctionRoutes.js'; // import item router for item routes
import bidRouter from './routes/bidRoutes.js'; // import bid router for bid routes
import notificationRouter from './routes/notificationRoutes.js' // import notification router for notification
import http from 'http'; // import http for creating http server
import { initializeSocket } from './services/sendNotification.js'; // import socket for sending notification
import logger from './services/winstonLogger.js'; // import winston logger for logging all the request
import dotenv from 'dotenv'; // import dotenv for enviroment variable
import rateLimit from 'express-rate-limit'; //import rate limit
//use enviroment variable
dotenv.config();
const PORT=process.env.PORT || 4000; // set port
const app=express(); // create express instance
const server=http.createServer(app) // create http server
initializeSocket // initialize socket
app.use(cors()); // cors middleware for cross origin request
app.use(bodyParser.urlencoded({ extended: true })); // body parser middleware for urlencoded
app.use(bodyParser.json({ extended: true })); // body parser middleware for json

// Middleware to log HTTP requests
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// Implement API rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});

app.use('/', apiLimiter); // apply rate limiter to all routes
// Routes
app.use('/',userRouter);
app.use('/',itemsRouter);
app.use('/',bidRouter);
app.use('/',notificationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: 'Internal Server Error' });
});

//start server
app.listen(PORT,()=>{
    logger.info(`Server is running on the port ${PORT}`);

})
