import { Model } from "mongoose";

export type TUser = {
    [x: string]: string | undefined;
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address?: string;
    status: string
}

export type NewUser = {
    password: string,
    role: string,
    id: string
}

export interface UserModel extends Model<TUser> {
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    isUserExistsByCustomId(email: string): Promise<TUser | null>;
}