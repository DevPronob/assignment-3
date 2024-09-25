import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";


const createSignupIntoDB = async (payload: TLoginUser) => {

    // Check if the user already exists
    const user = await User.isUserExistsByCustomId(payload.email);
    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
    }

    // Create a new user
    const newUser = new User(payload);
    await newUser.save();

    // Retrieve the user without the password field
    const userWithoutPassword = await User.findById(newUser._id).select('-password');
    return userWithoutPassword;
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
        process.env.JWT_SECRECT as string,
        '10d',
    );
    const refreshToken = createToken(
        jwtPayload,
        process.env.JWT_SECRECT as string,
        '30d',
    );
    const userWithoutPassword = await User.findById(user._id).select('-password');

    return {
        token,
        refreshToken,
        user: userWithoutPassword
    }

};

export const AuthServices = {
    createSignupIntoDB,
    loginIntoDB
}