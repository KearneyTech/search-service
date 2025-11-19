// src/repositories/ItemRepository.ts
import { Database } from '../dataSources/Database.js';

export interface Item {
    id?: number;
    title: string;
    subtitle: string;
    description: string;
}

export interface ItemRepository {
    getAll(): Promise<Item[]>;
    create(item: Item): Promise<void>;
}

export class PostgresItemRepository implements ItemRepository {
    constructor(private db: Database) {}

    async getAll(): Promise<Item[]> {
        return this.db.query<Item>('SELECT * FROM items ORDER BY id DESC');
    }

    async create(item: Item): Promise<void> {
        await this.db.query(
            'INSERT INTO items (title, subtitle, description) VALUES ($1, $2, $3)',
            [item.title, item.subtitle, item.description]
        );
    }
}

export class MockItemRepository implements ItemRepository {
    private items: Item[] = [];
    private nextId = 1;

    async getAll(): Promise<Item[]> {
        return this.items;
    }

    async create(item: Item): Promise<void> {
        this.items.push({ id: this.nextId++, ...item });
    }
}
