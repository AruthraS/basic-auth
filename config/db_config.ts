import dotenv from 'dotenv';
import path from 'path';

dotenv.config(
  { path: path.resolve(__dirname, '../.env') }
);

export default {
    hostName : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    dbName : process.env.DB_NAME
}