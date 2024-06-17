import { z } from 'zod';

export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required"
        }),
        email: z.string().email("Invalid email address"),
        role: z.enum(['admin', 'user']).default('user'),
        password: z.string({
            required_error: "password is required"
        }).min(3, { message: "Password must be at least 3 characters" }),
        phone: z.string({
            required_error: "phone number is required"
        }),
        address: z.string({
            required_error: "address is required"
        }),
    })
});
export const loginUserValidationSchema = z.object({
    body: z.object({

        email: z.string().email("Invalid email address"),
        password: z.string({
            required_error: "password is required"
        }).min(2, { message: "Password must be at least 2 characters" }),
    })
});
export const UserValidations = {
    createUserValidationSchema,
    loginUserValidationSchema
};