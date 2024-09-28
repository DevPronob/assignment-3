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
exports.BookingsServices = void 0;
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const { ObjectId } = mongoose_1.Types;
const createBookingIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    // Create the booking 
    const data = Object.assign(Object.assign({}, payload), { user: userId, car: payload.car });
    const booking = new booking_model_1.Booking(data);
    console.log(booking);
    // Save the booking 
    yield (yield booking.populate('user')).populate('car');
    const result = yield booking.save();
    return result;
});
const getBookingsFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //getting all bookings
    console.log(payload, ":qurey");
    const query = new QueryBuilder_1.QueryBuilder(booking_model_1.Booking.find({}).populate('user').populate('car'), payload)
        .filter();
    const result = yield query.modelQuery;
    return result;
});
const getMyBookingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //getting user bookings
    const objectId = new ObjectId(id);
    console.log(objectId);
    // Query the database using the ObjectId
    const result = booking_model_1.Booking.find({ user: objectId }).populate('user').populate('car');
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExits = yield booking_model_1.Booking.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking is not exits");
    }
    console.log(payload, id, "all");
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //soft deletting car with id
    const isCarExits = yield booking_model_1.Booking.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not exits");
    }
    const result = yield booking_model_1.Booking.findOneAndDelete({ _id: id });
    return result;
});
exports.BookingsServices = {
    createBookingIntoDB,
    getBookingsFromDB,
    getMyBookingsFromDB,
    updateBooking,
    deleteBooking
};
