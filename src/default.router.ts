/**
 * 
 * Routes for Item objects
 * 
 * Added method to get an item by ID.
 * Initial PUT function.
 * 
 * ::TODOs::
 * Where does SQL belong?
 * Validate proper responses, normal and error.
 */
import express, { Request, Response } from 'express';
import * as defaultService from './default.service';
const pool = require('./database.local');

export const defaultRouter = express.Router();

// GET item by ID
defaultRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [req.params.id]);

        if(result.rows.length === 0) {
            return res.status(404).send("Record not found");
        }

        res.json(result.rows[0]);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Get error for id ${req.params.id}, ${error.message}`)
    }
});

// GET items
defaultRouter.get('/', async (req: Request, res: Response) => {
    try {
        try {
            const result = await pool.query('SELECT * FROM items');
            res.status(200).json(result.rows);
        } catch (err: any) {
            console.error(err);
        }
    } catch (e: any) {
        res.status(500).send(`Get error, ${e.message}`);
    }
});

// PUT items
defaultRouter.put('/', async (req: Request, res: Response) => {
    try {
        console.log('put ', req.body.title);

        const insert = await pool.query(
            'UPDATE items SET title = $1, subtitle = $2, description = $3, updated_at = now() WHERE id = $4 RETURNING *',
            [req.body.title, req.body.subtitle, req.body.description, req.body.id]
        );

        res.status(200).send(JSON.stringify({ response: 'put response' }));
    } catch (e: any) {
        res.status(500).send(`Put error, ${e.message}`);
    }
});

// POST items
defaultRouter.post('/', async (req: Request, res: Response) => {
    try {
        console.log('post ', req.body.title);

        const insert = await pool.query(
            'INSERT INTO items (title, subtitle, description) VALUES ($1, $2, $3) RETURNING *',
            [req.body.title, req.body.subtitle, req.body.description]
        );

        res.json(insert.rows);
    } catch (e: any) {
        res.status(500).send(`Post error, e.message`);
    }
});

// DELETE items
defaultRouter.delete('/', async (req: Request, res: Response) => {
    try {
        res.status(200).send('delete response');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
