import * as dotenv from 'dotenv';
import { itemApp } from "./apps/ItemApp";
import { container as itemContainer } from "./containers/ItemContainer";
import { smartLogging } from "./common/SmartLogging";

dotenv.config();

const logger = new smartLogging("search-service", true);
const ITEM_PORT: number = parseInt(process.env.ITEM_PORT as string, 10);

(async () => {
    itemContainer.db.connect();
    
    itemApp.listen(ITEM_PORT, () => {
        logger.log("startup", `Item App listening on port:${ITEM_PORT}`);
    });
})();