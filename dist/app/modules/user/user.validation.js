"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = exports.loginUserValidationSchema = exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
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
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'blocked']).default('active')
    })
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email address").optional(),
        role: zod_1.z.enum(['admin', 'user']).default('user').optional(),
        password: zod_1.z.string().min(3, { message: "Password must be at least 3 characters" }).optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'blocked']).default('active').optional()
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
    loginUserValidationSchema: exports.loginUserValidationSchema,
    updateUserValidationSchema: exports.updateUserValidationSchema
};
