import mysql, { Pool } from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config();

const connection: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
});

export default connection;