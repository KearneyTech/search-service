// src/controllers/ItemController.ts
/**
 * 
 * TODOs:
 * Return value for create & update
 */
import { Request, Response } from 'express';
import { Database } from '../dataSources/Database';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging('ItemController', true);

export class ItemController {
    constructor(private db: Database) {}

    async getItemByID(req: Request, res: Response) {
        logger.log('getItemByID', `[${req.params.id}]`);

        if(req.params.id === '' || req.params.id === 'undefined') {
            res.status(500).send("Invalid id");
        } else {
            const items = await this.db.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
            res.status(200).json(items[0]);
        }
    }

    async getItems(req: Request, res: Response) {
        const items = await this.db.query('SELECT * FROM items');
        res.json(items);
    }

    async createItem(req: Request, res: Response) {
        const { title, subtitle, description } = req.body;
        logger.log('createItem', JSON.stringify(req.body));
        const item = await this.db.query(
            'INSERT INTO items (title, subtitle, description) VALUES ($1, $2, $3) RETURNING id',
            [title, subtitle, description]
        );
        res.json(JSON.stringify(item));
    }

    async updateItem(req: Request, res: Response) {
        const result = await this.db.query(
            'UPDATE items SET title = $1, subtitle = $2, description = $3, updated_at = now() WHERE id = $4 RETURNING id',
            [req.body.title, req.body.subtitle, req.body.description, req.body.id]
        );

        logger.log('updateItem', JSON.stringify(result[0]));

        res.status(200).json(JSON.stringify(result));
    }

    async deleteItem(req: Request, res: Response) {
        res.status(200).send("Delete Item requested");
    }
}
