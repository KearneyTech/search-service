import express, { Request, Response } from "express";

export const defaultRouter = express.Router();

// GET items
defaultRouter.get("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("get response");
    } catch (e) {
      res.status(500).send(e.message);
    }
});

// PUT items
defaultRouter.put("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("put response");
    } catch (e) {
      res.status(500).send(e.message);
    }
});

// POST items
defaultRouter.post("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("post response");
    } catch (e) {
      res.status(500).send(e.message);
    }
});

// DELETE items
defaultRouter.delete("/", async (req: Request, res: Response) => {
    try {
      res.status(200).send("delete response");
    } catch (e) {
      res.status(500).send(e.message);
    }
});
