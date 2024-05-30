// realtime notification to user
import {Socket}  from 'socket.io';
let io;
export const initializeSocket = (server) => {
    // create socket instance for server
    io = Socket(server, { 
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    //listen for connection
    io.on('connection', (socket) => { 
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export const emitNewBid = (bidData) => {
    if (io) {
        io.emit('newBid', bidData);
    }
};

