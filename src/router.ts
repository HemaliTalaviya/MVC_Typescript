import express from "express";
import { createUser, getUser, login } from "./controller/userController";
import { checkToken } from "./middleware/auth";


const router = express.Router();

router.post('/register',createUser)
router.post('/login',login)
router.get('/',checkToken,getUser)

export {
    router
}