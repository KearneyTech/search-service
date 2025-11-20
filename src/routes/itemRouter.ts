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
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { ItemController } from '../controllers/ItemController';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging("itemRouter", true);

export function createItemRoutes(controller: ItemController) {
    // Multer setup (no memory storage — just stream handling)
    const upload = multer({
        storage: multer.memoryStorage(), // We'll manually stream to disk later
        limits: {
            fileSize: 500 * 1024 * 1024 // 500MB max (adjust as needed)
        }
    });
    
    const defaultRouter = Router();

    // GET item by ID
    defaultRouter.get('/:id', controller.getItemByID.bind(controller));

    // GET items
    defaultRouter.get('/', controller.getItems.bind(controller));

    // PUT items
    defaultRouter.put('/', upload.single('file'), controller.updateItem.bind(controller));

    // POST items
    defaultRouter.post('/', controller.createItem.bind(controller));

    // DELETE items
    defaultRouter.delete('/', controller.deleteItem.bind(controller));

    return defaultRouter;
}
