"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = exports.loginUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required"
        }),
        email: zod_1.z.string().email("Invalid email address"),
        role: zod_1.z.enum(['admin', 'user']).default('user'),
        password: zod_1.z.string({
            required_error: "password is required"
        }).min(3, { message: "Password must be at least 3 characters" }),
        phone: zod_1.z.string({
            required_error: "phone number is required"
        }),
        address: zod_1.z.string({
            required_error: "address is required"
        }),
    })
});
exports.loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string({
            required_error: "password is required"
        }).min(2, { message: "Password must be at least 2 characters" }),
    })
});
exports.UserValidations = {
    createUserValidationSchema: exports.createUserValidationSchema,
    loginUserValidationSchema: exports.loginUserValidationSchema
};
