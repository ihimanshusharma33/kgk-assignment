import jwt from 'jsonwebtoken'
import connection from '../config/conn.js';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const getNotification=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    //check if token is received
    if(!token){ 
        res.status(404).json({"message":"token is not received"});
    }
    const decoded=jwt.verify(token,JWT_SECRET); // Verify the token
    const user_id=decoded.user_id; // Attach the decoded user to the request
    connection.query("SELECT * FROM notifications WHERE user_id=?",[user_id],(err,results)=>{
        if(err){
            console.log(err);
            res.status(500).json({"message":"internal server error"});
        }
        if(results===0){
            res.status(404).json({"message":"Currently no notification"});
        }
        res.status(200).json(results);
    })
}
export const markReadNotification=async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(404).json({"message":"token is not received"});
    }
    const decoded=jwt.verify(token,JWT_SECRET);
    const user_id=decoded.user_id;
    console.log(user_id);
    connection.query("UPDATE notifications SET is_read = true  WHERE User_id=?",[user_id],(err,results)=>{
        if(err){
            res.status(500).json({"message":"internal server error"});
        }
        res.status(200).json({"message":"notification status update sucessfully",results})
    })
}