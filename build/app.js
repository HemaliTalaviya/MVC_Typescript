"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./connection/mongoDB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router_1 = require("./router");
(0, mongoDB_1.mongoDb)();
app.use(express_1.default.json());
app.use('/', router_1.router);
const PORT = process.env.PORT || 4000;
// const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
