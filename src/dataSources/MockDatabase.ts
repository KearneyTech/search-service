// MockDatabase.ts
import { Database } from './Database.js';
import { Item } from '../types/item';

export class MockDatabase implements Database {
    private items: Item[] = [];
    private nextId = 1;

    async connect() {
        console.log('Mock DB connected');
    }

    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        // crude SQL router for testing
        if (sql.startsWith('SELECT')) {
            return this.items as T[];
        }

        if (sql.startsWith('INSERT')) {
            const [title, subtitle, description] = params;
            this.items.push({
                id: this.nextId++ + '',
                title,
                subtitle,
                description
            });
            return [] as T[];
        }

        throw new Error('Unsupported mock query: ' + sql);
    }

    async close() {
        console.log('Mock DB closed');
    }
}
