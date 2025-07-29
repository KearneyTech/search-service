//import mysql from "mysql";
//const { Pool } = require("pg");
import * as dotenv from "dotenv";
import { Pool, PoolClient } from 'pg';

dotenv.config();

const portNum = parseInt(process.env.PGPORT as string, 10);

console.log('test', process.env.PGPASSWORD)

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

/*

export default function dbLocalInit(): PoolClient {
    const portNum = parseInt(process.env.PGPORT as string, 10)
    const pool = new Pool({
        host: process.env.PGHOST,
        port: portNum,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE
    });

    let client : PoolClient;

    (async () => {
        try {
            client = await pool.connect();
            console.log('Connected to PostgreSQL, pool count:', pool.totalCount);

            const status = await client.query('SELECT NOW()');
            console.log('Status ', status.rows[0]);

            const res = await client.query('SELECT * FROM users');
            console.log('Sample ', res.rows);

            return client;
        } catch (err:any) {
            console.error('PostgreSQL connection error', err);
        }
    })();
}
        // Create a connection to MySQL
        const connection = mysql.createConnection({
            // host: 'localhost',
            // port: 3306,
            // user: 'root',
            // password: 'Password1!',
            // database: 'mysql'
            // uri: mongo
            host: 'postgres',
            port: 5432,
            user: 'dev',
            password: 'dev',
            database: 'devdb'
        });
        // Connect to MySQL
        connection.connect();
        console.log('connection.connect()');
        // Query the database
        //const results = connection.query('select * from languageLesson');
        //console.log(results);
        // Close the connection
        connection.end();
*/
