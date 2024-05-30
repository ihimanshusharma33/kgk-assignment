import connection from "../config/conn.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//conroller to get all bids
export const getAllbid = async (req, res) => {
    const { itemId } = req.params;
    if(!itemId){
        res.status(400).json({error:"id is missing"})
        return;
    }
    connection.query('SELECT * FROM bids WHERE items_id=?', [itemId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch bids' });
            return;
        }
        if (results === 0) {
            res.status(404).json({ error: "no Data Found" })
            return
        }
        res.status(200).json(results);
    });
}
//controller to place new bid
export const placeNewBid = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { bid_amount } = req.body;
    const { itemId } = req.params
    if (!token) {
        res.status(401).json({ "message": "unauthorized access" });
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) //verify token
    const user_id = decoded.user_id; //get user id from token
    //query to insert data into database
    connection.query("INSERT INTO bids (item_id,user_id,bid_amount) VALUES (?,?,?)", [itemId, user_id, bid_amount], (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    })
    //respond with success message
    res.status(200).json({ "message": "token verify" });
}