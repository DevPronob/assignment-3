import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendRespons";
import httpStatus from 'http-status';
import { AuthServices } from "./auth.service";
import config from "../../../config";

const signup = catchAsync(
    async (req, res) => {

        const result = await AuthServices.createSignupIntoDB(req.body);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'User registered successfully',
            data: result
        })


    }
)

const login = catchAsync(
    async (req, res) => {

        const result = await AuthServices.loginIntoDB(req.body);
        const { token, refreshToken, user } = result;
        res.cookie('refreshToken', refreshToken, {
            secure: config.NODE_ENV === 'production',
            httpOnly: true,
        });
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User logged in successfully',
            data: {
                user,
                token
            }
        })


    }
)

export const AuthControllers = {
    signup,
    login
}