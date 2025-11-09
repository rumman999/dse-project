import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'spycakes',
  database: 'dse_db',
  password: 'spycakesword'
});

export default pool

