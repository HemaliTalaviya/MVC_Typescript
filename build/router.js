"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./controller/userController");
const auth_1 = require("./middleware/auth");
const router = express_1.default.Router();
exports.router = router;
router.post('/register', userController_1.createUser);
router.post('/login', userController_1.login);
router.get('/', auth_1.checkToken, userController_1.getUser);
