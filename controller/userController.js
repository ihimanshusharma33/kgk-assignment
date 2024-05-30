import connection from '../config/conn.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//user register controller 
export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {

        // Check if user already exists
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            connection.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [username, email, hashedPassword, role || 'user'],
                (err, results) => {
                    if (err) {
                        console.error('Error inserting into database:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// user login controller 
export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Check if user exists
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const user = results[0];

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Optionally, check for role if necessary
            if (role && user.role !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }

            // Generate JWT token
            const token = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// profile controller 
export const profile = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    console.log(`token is received`,token);
    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(`token is decoded`,decoded);
        const userId = decoded.user_id;
       
        // Query the database for user profile
        connection.query('SELECT user_id, username, email, role, created_at FROM users WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send user profile information
            const user = results[0];
            res.status(200).json({ user });
        });
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ "message": "Invalid or expired token" });
    }
};