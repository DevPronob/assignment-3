"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilits/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utilits/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = require("./booking.service");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user.email;
    const userId = yield user_model_1.User.isUserExistsByCustomId(userEmail);
    const result = yield booking_service_1.BookingsServices.createBookingIntoDB(req.body, userId === null || userId === void 0 ? void 0 : userId._id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car booked successfully',
        data: result
    });
}));
const getBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingsServices.getBookingsFromDB(req.query);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result
    });
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params
    const userEmail = req.user.email;
    const userId = yield user_model_1.User.isUserExistsByCustomId(userEmail);
    if (!userId) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield booking_service_1.BookingsServices.getMyBookingsFromDB(userId === null || userId === void 0 ? void 0 : userId._id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'My Bookings retrieved successfully',
        data: result
    });
}));
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { id } = req.params;
    const result = yield booking_service_1.BookingsServices.updateBooking(id, req.body);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: ' Booking updates successfully',
        data: result
    });
}));
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingsServices.deleteBooking(id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: ' Booking deleted successfully',
        data: result
    });
}));
exports.BookingControllers = {
    createBooking,
    getBookings,
    getUserBookings,
    updateBooking,
    deleteBooking
};
