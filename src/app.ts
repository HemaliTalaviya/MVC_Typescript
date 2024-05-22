import express from "express";
import { mongoDb } from "./connection/mongoDB";
import dotenv from 'dotenv';
import http from "http";
dotenv.config({ path: './.env' });

import { router } from "./router";
import { logger } from "./logger";
const app = express();
const port: any = process.env.PORT || 5000;

mongoDb();
app.use(express.json());
app.use('/', router);

// const PORT = 3000
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
})      