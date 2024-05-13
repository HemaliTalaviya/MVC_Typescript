"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpvalidation = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpvalidation = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(3)
    });
    const validateData = schema.validate(data);
    return validateData;
};
exports.signUpvalidation = signUpvalidation;
