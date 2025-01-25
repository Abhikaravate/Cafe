
const mysql = require('mysql');


// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ahee',
  password: '2021',
  database: 'cafemanagement', // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message || err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;


// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Timeout after 5s if server is unavailable
//   socketTimeoutMS: 45000,        // Close sockets after 45 seconds
//   maxPoolSize: 10,               // Maintain up to 10 socket connections
//   minPoolSize: 2,                // Ensure at least 2 sockets in the pool
//   connectTimeoutMS: 10000,
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
