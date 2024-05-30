import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config();
//create connection to database
const connection =mysql.createConnection({ 
    host: process.env.Host,   
    user: process.env.User, 
    password: '',
    database: process.env.Database
} 
)
 //connect to database
connection.connect((err)=>{
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
      }
      console.error('Sucessfully connected to database');    
})
export default connection;