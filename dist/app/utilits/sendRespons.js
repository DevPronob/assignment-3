"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    console.log(data);
    if (data.data && Array.isArray(data.data) ? data.data.length > 0 : true) {
        return res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data.success,
            message: data.message,
            data: data.data,
        });
    }
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'No Data Found',
        data: [],
    });
};
exports.default = sendResponse;
