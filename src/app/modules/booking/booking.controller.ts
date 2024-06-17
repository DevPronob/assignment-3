import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendRespons";
import httpStatus from 'http-status';
import config from "../../../config";
import { BookingsServices } from "./booking.service";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";

const createBooking = catchAsync(
    async (req, res) => {
        const userEmail = req.user.email
        const userId = await User.isUserExistsByCustomId(userEmail)
        const result = await BookingsServices.createBookingIntoDB(req.body, userId?._id);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Car booked successfully',
            data: result
        })


    }
)

const getBookings = catchAsync(
    async (req, res) => {
        const result = await BookingsServices.getBookingsFromDB(req.query);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Bookings retrieved successfully',
            data: result
        })


    }
)
const getUserBookings = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const userEmail = req.user.email
        const userId = await User.isUserExistsByCustomId(userEmail)
        if (!userId) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found")
        }
        const result = await BookingsServices.getMyBookingsFromDB(userId?._id);
        console.log(result, "result")
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'My Bookings retrieved successfully',
            data: result
        })


    }
)




export const BookingControllers = {
    createBooking,
    getBookings,
    getUserBookings
}