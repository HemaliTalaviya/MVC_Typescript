import express  from "express";
import { mongoDb } from "./connection/mongoDB";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

import { router } from "./router";
mongoDb();
app.use(express.json());
app.use('/',router);

const PORT = process.env.PORT || 4000;
// const PORT = 3000
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})