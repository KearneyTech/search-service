// src/app.ts
import express from "express";
import cors from 'cors';
import helmet from "helmet";
import { container } from "../containers/ItemContainer";

const itemApp = express();

itemApp.use(helmet());
itemApp.use(cors());
itemApp.use(express.json());
itemApp.use('/api/default', container.itemRoutes);
itemApp.use('/api/upload', container.uploadRouter);

export { itemApp };
