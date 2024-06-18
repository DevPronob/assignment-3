"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 500;
    const errorSources = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message
        }
    ];
    return {
        statusCode,
        errorSources,
        message: "Invalid Id"
    };
};
exports.default = handleCastError;
