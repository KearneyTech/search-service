import express, { Request, Response } from "express";
import * as defaultService from "./default.service";
const pool = require("./database.local");

export const defaultRouter = express.Router();

// GET items
defaultRouter.get("/", async (req: Request, res: Response) => {
    try {
        //const responseData: defaultService.BaseItem = await defaultService.get()
        //return res.status(200).json(responseData);
        try {
/*           const sample = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            ['Chuck', 'charls@example.com']
          );
 */          
          const result = await pool.query('SELECT * FROM users');
          res.status(200).json(result.rows);
        } catch (err:any) {
          console.error(err);
        }
    } catch (e:any) {
      res.status(500).send(`Get error, ${e.message}`);
    }
});

// PUT items
defaultRouter.put("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("put response");
    } catch (e:any) {
      res.status(500).send(`Put error, ${e.message}`);
    }
});

// POST items
defaultRouter.post("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("post response");
    } catch (e:any) {
      res.status(500).send(e.message);
    }
});

// DELETE items
defaultRouter.delete("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("delete response");
    } catch (e:any) {
      res.status(500).send(e.message);
    }
});
