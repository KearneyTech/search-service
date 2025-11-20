// src/controllers/ItemController.ts
/**
 *
 * TODOs:
 * Return value for create & update
 */
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Database } from '../dataSources/Database';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging('ItemController', true);

export class ItemController {
    UPLOAD_DIR: string;

    constructor(private db: Database, uploadDir: string) {
        // Directory for saving uploaded files
        this.UPLOAD_DIR = path.join(process.cwd(), uploadDir);

        // Ensure the upload directory exists
        if (!fs.existsSync(this.UPLOAD_DIR)) {
            fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
        }
    }

    async getItemByID(req: Request, res: Response) {
        logger.log('getItemByID', `[${req.params.id}]`);

        if (req.params.id === '' || req.params.id === 'undefined') {
            res.status(500).send('Invalid id');
        } else {
            const items = await this.db.query(
                'SELECT * FROM items WHERE id = $1',
                [req.params.id]
            );
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
        logger.log('updateItem', 'start');
        logger.log(
            'updateItem',
            `content-type: ${req.headers['content-type']}`
        );
        logger.log('updateItem', `method:       ${req.method}`);
        logger.log('updateItem', `url:          ${req.url}`);
        logger.log('updateItem', JSON.stringify(req.body));
        logger.log('updateItem', req.body.description);

        if (req.file) {
            try {
                logger.log('updateItem', 'got file');
                const { originalname, buffer, mimetype } = req.file;

                // Helper: sanitize file names to avoid path traversal
                const safeName = originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

                const outputPath = path.join(this.UPLOAD_DIR, safeName);

                logger.log('POST /media', `outputPath: ${outputPath}`);
                logger.log('POST /media', `readStream complete`);

                // But since Multer gives a Buffer, we can wrap it as a stream manually
                const { Readable } = await import('stream');
                const fileStream = Readable.from(buffer);

                // Stream file buffer to disk
                const writeStream = fs.createWriteStream(outputPath);

                logger.log('POST /media', `writeStream complete`);

                const pump = promisify(pipeline);
                await pump(fileStream, writeStream);
            } catch (error) {
                console.error('Item Controller, updateItem - Error storing uploaded file.');
            }
        } else {
            logger.log('updateItem', 'no file');
        }

        const result = await this.db.query(
            'UPDATE items SET title = $1, subtitle = $2, description = $3, updated_at = now() WHERE id = $4 RETURNING id',
            [req.body.title, req.body.subtitle, req.body.description, req.body.id]
        );

        logger.log('updateItem', JSON.stringify(result[0]));

        res.status(200).json(JSON.stringify(result));
    }

    async deleteItem(req: Request, res: Response) {
        res.status(200).send('Delete Item requested');
    }
}
