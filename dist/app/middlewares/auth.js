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
const catchAsync_1 = __importDefault(require("../utilits/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...userRoles) => {
    console.log(userRoles);
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
        }
        const VerityToken = token.split(" ")[1];
        console.log("Token from headers:", token); // Log the token
        const decoded = jsonwebtoken_1.default.verify(VerityToken, process.env.JWT_SECRECT);
        if (!decoded) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
        }
        console.log(decoded);
        const user = yield user_model_1.User.findOne({ email: decoded.email });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You Are not loged in");
        }
        if (userRoles && !userRoles.includes(user.role)) {
            throw new AppError_1.default(401, "You have no access to this route");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
