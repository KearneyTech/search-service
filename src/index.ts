/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import { defaultRouter } from "./default.router";
 //import dbLocalInit from "./database.local";
 
 dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) {
   console.log(`Error looking for port ${PORT}`);
   process.exit(1);
}

const app = express();

/**
 *  App Configuration
 */

 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 app.use("/api/default", defaultRouter);

// Database
//dbLocalInit();
 
 /**
 * Server Activation
 */

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });