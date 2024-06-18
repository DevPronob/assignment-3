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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const createSignupIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user already exists
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists");
    }
    // Create a new user
    const newUser = new user_model_1.User(payload);
    yield newUser.save();
    // Retrieve the user without the password field
    const userWithoutPassword = yield user_model_1.User.findById(newUser._id).select('-password');
    return userWithoutPassword;
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //login user with email and passord
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This user is not found!");
    }
    //matching passwotd with model statics 
    const isPasswordValid = yield user_model_1.User.isPasswordMatched(payload.password, user === null || user === void 0 ? void 0 : user.password);
    console.log(isPasswordValid, "user");
    if (!isPasswordValid) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'You Have input a wrong password ');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    //creating jwt token
    const token = (0, auth_utils_1.createToken)(jwtPayload, process.env.JWT_SECRECT, '10d');
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, process.env.JWT_SECRECT, '30d');
    const userWithoutPassword = yield user_model_1.User.findById(user._id).select('-password');
    return {
        token,
        refreshToken,
        user: userWithoutPassword
    };
});
exports.AuthServices = {
    createSignupIntoDB,
    loginIntoDB
};
