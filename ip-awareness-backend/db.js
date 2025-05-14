
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Password',
  database: 'ip_awareness_game'
});
module.exports = pool.promise();
