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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilits/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utilits/sendRespons"));
const user_service_1 = require("./user.service");
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user, "bookings");
    const result = yield user_service_1.UserServices.getUsers();
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users retrieved successfully',
        data: result
    });
}));
const updateUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserServices.updateUser(id, req.body);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: result
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req === null || req === void 0 ? void 0 : req.user._id;
    console.log(req.user.email);
    const result = yield user_service_1.UserServices.getMe(req.user.email);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User rectrive successfully',
        data: result
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.changePasswordfromdb(req.user.email, req.body);
    console.log(req.user.email, req.body, "bodddy");
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User passowrd changed successfully',
        data: result
    });
}));
exports.UserControllers = {
    getUsers,
    updateUsers,
    getMe,
    changePassword
};
