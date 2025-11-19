import * as dotenv from "dotenv";
import { Pool, PoolClient } from 'pg';
import { smartLogging } from "./common/SmartLogging";

const logger = new smartLogging("database.local", false);
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
    .then(() => logger.log("pool.connect", `Connected to PostgreSQL, pool count: ${pool.totalCount}`))
    .catch((err:any) => console.error('PostgreSQL connection error', err));

module.exports = pool;
