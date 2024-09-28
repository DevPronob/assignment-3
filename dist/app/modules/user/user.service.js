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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload");
    const isCarExits = yield user_model_1.User.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is not exits");
    }
    console.log(payload, id, "all");
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getMe = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
});
const changePasswordfromdb = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload.oldPassword, payload.newPassword, 'from service');
    console.log(userData, 'from service');
    // Find the user by custom ID
    const user = yield user_model_1.User.isUserExistsByCustomId(userData);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    // Check if the old password matches the stored password
    const isMatch = yield user_model_1.User.isPasswordMatched(payload.oldPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Old password does not match');
    }
    console.log(isMatch, "Password match");
    // Ensure bcrypt salt rounds are configured correctly
    const saltRounds = Number(config_1.default.bcrypt_salt_rounds) || 10;
    // Hash the new password with salt rounds
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, saltRounds);
    console.log(newHashedPassword, "New hashed password");
    // Update the user's password in the database
    yield user_model_1.User.findOneAndUpdate({ _id: user._id }, // Query
    { password: newHashedPassword } // Update
    );
    return { message: 'Password updated successfully' };
});
exports.UserServices = {
    updateUser,
    getUsers,
    getMe,
    changePasswordfromdb
};
