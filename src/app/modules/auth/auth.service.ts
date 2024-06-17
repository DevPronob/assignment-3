import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../../config";

const createSignupIntoDB = async (payload: TLoginUser) => {

    //registering user
    console.log(payload, "payload")
    const user = await User.isUserExistsByCustomId(payload.email)
    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already Exits")
    }
    const result = await User.create(payload)
    return result
};

const loginIntoDB = async (payload: TUser) => {
    //login user with email and passord
    const user = await User.isUserExistsByCustomId(payload.email)
    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "This user is not found!")
    }

    //matching passwotd with model statics 
    const isPasswordValid = await User.isPasswordMatched(payload.password, user?.password);
    console.log(isPasswordValid, "user")
    if (!isPasswordValid) {
        throw new AppError(httpStatus.NOT_FOUND, 'You Have input a wrong password ');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    //creating jwt token
    const token = createToken(
        jwtPayload,
        config.jwt_secrect as string,
        '10d',
    );
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_secrect as string,
        '30d',
    );

    return {
        token,
        refreshToken,
        user
    }

};

export const AuthServices = {
    createSignupIntoDB,
    loginIntoDB
}