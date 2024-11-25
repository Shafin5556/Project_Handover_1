const mysql = require('mysql2');

// Set up the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'travel_booking' // the name of your database
});

module.exports = pool.promise();
