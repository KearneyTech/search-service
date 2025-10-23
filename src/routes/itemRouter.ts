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
import { ItemController } from '../controllers/ItemController';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging("itemRouter", true);

export function createItemRoutes(controller: ItemController) {
    const defaultRouter = Router();

    // GET item by ID
    defaultRouter.get('/:id', controller.getItemByID.bind(controller));

    // GET items
    defaultRouter.get('/', controller.getItems.bind(controller));

    // PUT items
    defaultRouter.put('/', controller.updateItem.bind(controller));

    // POST items
    defaultRouter.post('/', controller.createItem.bind(controller));

    // DELETE items
    defaultRouter.delete('/', controller.deleteItem.bind(controller));

    return defaultRouter;
}
