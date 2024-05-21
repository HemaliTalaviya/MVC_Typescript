"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.createUser = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpValidation_1 = require("../validation/signUpValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'artoonwork@gmail.com',
        pass: 'auth-key'
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkdata = (0, signUpValidation_1.signUpvalidation)(req.body);
        // console.log('checkdata',checkdata);
        if (checkdata.error) {
            return res.status(400).json({
                success: false,
                message: checkdata.error.details[0].message
            });
        }
        var mailOptions = {
            from: 'artoonwork@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const userData = yield userModel_1.User.create({
            name,
            email,
            password: hashPassword
        });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: 'user not created'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: userData
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield userModel_1.User.findOne({ email: email });
        // console.log('existing user', existingUser);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        //    const matchPassword = password === existingUser.password;
        const matchPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id }, 'cdmi', { expiresIn: "30s" });
        return res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            data: existingUser,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getData = yield userModel_1.User.find();
        return res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: getData
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getUser = getUser;
// export const removeData = async (req:Request,res:Response)=>{
//     try {
//         let data = await User.findByIdAndDelete();
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:(error as Error).message
//         })
//     }
// }
