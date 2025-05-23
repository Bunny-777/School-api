const mysql = require('mysql2');
require('dotenv').config(); // Make sure this line is at the TOP

const url = require('url');
console.log('Loading MYSQL_URL:', process.env.MYSQL_URL); // DEBUG

const dbUrl = new URL(process.env.MYSQL_URL || '');
console.log('Parsed DB URL:', dbUrl); // DEBUG

const connection = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  port: dbUrl.port,
  database: dbUrl.pathname?.split('/')[1],
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
