import { Database } from '../dataSources/Database';
import { PostgresDatabase } from '../dataSources/PostgresDatabase';
import { MockDatabase } from '../dataSources/MockDatabase';
import { ItemController } from '../controllers/ItemController';
import { createItemRoutes } from '../routes/itemRouter';
import { createUploadRoutes } from '../routes/uploadRouter';

const dbType = process.env.ITEM_DB_TYPE || 'postgres';
const postgresConnection = process.env.POSTGRES_ITEM_DB_URL || '';
const itemMediaPath = process.env.ITEM_MEDIA_PATH || 'uploads';

let db: Database;

db =
    dbType === 'mock'
        ? new MockDatabase()
        : new PostgresDatabase(postgresConnection);

const itemController = new ItemController(db, itemMediaPath);
const itemRoutes = createItemRoutes(itemController);
const uploadRouter = createUploadRoutes();

export const container = {
    db,
    itemController,
    itemRoutes,
    uploadRouter
};
