import * as dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import helmet from "helmet";
import path from "path";
import { container } from "../containers/ItemContainer";

dotenv.config();

if(!process.env.ITEM_MEDIA_PATH) {
    console.log(`Error looking for path ITEM_MEDIA_PATH`);
    process.exit(1);
}

let itemMediaPath = process.env.ITEM_MEDIA_PATH as string;
const itemApp = express();

itemApp.use(helmet());
itemApp.use(cors());
itemApp.use(express.json());
itemApp.use('/api/default', container.itemRoutes);
itemApp.use('/api/upload', container.uploadRouter);
itemApp.use('/media', express.static(path.join(process.cwd(), itemMediaPath)));

export { itemApp };
