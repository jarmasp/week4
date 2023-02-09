//import pg as Pool from 'pg' 
import { Pool } from 'pg';

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'week4',
  password: 'password',
  port: 5432,
})

export { pool } 