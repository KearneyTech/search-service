// src/db/PostgresDatabase.ts
import { Pool } from 'pg';
import { Database } from './Database.js';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging('PostgresDatabase', true);

export class PostgresDatabase implements Database {
    private pool: Pool;

    constructor(connectionString: string) {
        this.pool = new Pool({ connectionString });
    }

    async connect() {
        await this.pool.connect()
            .then(() => console.log('Connected to PostgreSQL, pool count:', this.pool.totalCount))
            .catch((err:any) => console.error('PostgreSQL connection error', err));
    }

    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const { rows } = await this.pool.query(sql, params);
        logger.log('query', JSON.stringify(rows));
        return rows;
    }

    async close() {
        await this.pool.end();
    }
}
