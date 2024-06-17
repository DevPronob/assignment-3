export const USER_Role = {
    ADMIN: "admin",
    USER: "user",
} as const;

export type UserRole = (typeof USER_Role)[keyof typeof USER_Role];