import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendRespons";
import { UserServices } from "./user.service";



const getUsers = catchAsync(
    async (req, res) => {
        console.log(req.user, "bookings")
        const result = await UserServices.getUsers();
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Users retrieved successfully',
            data: result
        })


    }
)

const updateUsers = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await UserServices.updateUser(id, req.body);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User updated successfully',
            data: result
        })


    }
)

const getMe = catchAsync(
    async (req, res) => {
        const userId = req?.user._id
        console.log(req.user.email)
        const result = await UserServices.getMe(req.user.email);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User rectrive successfully',
            data: result
        })


    }
)
const changePassword = catchAsync(
    async (req, res) => {
        const result = await UserServices.changePasswordfromdb(req.user.email, req.body);
        console.log(req.user.email, req.body, "bodddy")
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User passowrd changed successfully',
            data: result
        })


    }
)


export const UserControllers = {
    getUsers,
    updateUsers,
    getMe,
    changePassword
}