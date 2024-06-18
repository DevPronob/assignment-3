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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsServices = void 0;
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const booking_model_1 = require("./booking.model");
const { ObjectId } = mongoose_1.Types;
const createBookingIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, carId, startTime } = payload;
    // Create the booking 
    const booking = new booking_model_1.Booking({
        date,
        user: userId,
        car: carId,
        startTime,
    });
    // Save the booking 
    yield (yield booking.populate('user')).populate('car');
    const result = yield booking.save();
    return result;
});
const getBookingsFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //getting all bookings
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
    const result = yield booking_model_1.Booking.find({ user: objectId }).populate('user').populate('car');
    return result;
});
exports.BookingsServices = {
    createBookingIntoDB,
    getBookingsFromDB,
    getMyBookingsFromDB
};
