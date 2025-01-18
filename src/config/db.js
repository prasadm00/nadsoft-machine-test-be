import pkg from 'pg';
const { Pool } = pkg;
import config from './config.js';

export const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: config.database.port,
});
