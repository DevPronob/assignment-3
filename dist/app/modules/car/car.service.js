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
exports.CarServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("./car.model");
const booking_model_1 = require("../booking/booking.model");
const car_utils_1 = __importDefault(require("./car.utils"));
const createCarIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //creating car
    console.log(payload, "payload");
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    //getting all cars
    const result = yield car_model_1.Car.find();
    return result;
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //getting single car with id
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const upddateSingleCarIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //updating car
    const isCarExits = yield car_model_1.Car.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not exits");
    }
    const result = yield car_model_1.Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteSingleCarIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //soft deletting car with id
    const isCarExits = yield car_model_1.Car.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not exits");
    }
    const result = yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
const returnCarIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //returing car by adding total and end time
    const booking = yield booking_model_1.Booking.findById(payload.bookingId);
    console.log(booking, "booking");
    const startTime = booking === null || booking === void 0 ? void 0 : booking.startTime;
    const car = yield car_model_1.Car.findById(booking === null || booking === void 0 ? void 0 : booking.car);
    const resTotal = (0, car_utils_1.default)(startTime, payload.endTime, car === null || car === void 0 ? void 0 : car.pricePerHour); //total cost getting by this 
    const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: payload.bookingId }, {
        endTime: payload.endTime,
        totalCost: resTotal
    }, { new: true });
    return result;
});
exports.CarServices = {
    createCarIntoDB,
    getCarsFromDB,
    getSingleCarFromDB,
    upddateSingleCarIntoDB,
    deleteSingleCarIntoDB,
    returnCarIntoDB
};
