import * as dotenv from "dotenv";
import { Pool, PoolClient } from 'pg';

dotenv.config();

const portNum = parseInt(process.env.PGPORT as string, 10);

const pool = new Pool({
        host: process.env.PGHOST,
        port: portNum,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL, pool count:', pool.totalCount))
    .catch((err:any) => console.error('PostgreSQL connection error', err));

module.exports = pool;
