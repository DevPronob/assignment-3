"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGO_URL,
    bcrypt_salt_rounds: process.env.SALT_ROUND,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET
};
exports.default = config;
