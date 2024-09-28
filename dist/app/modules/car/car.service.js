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
/* eslint-disable prefer-const */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("./car.model");
const booking_model_1 = require("../booking/booking.model");
const car_utils_1 = __importDefault(require("./car.utils"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const cloudinary_1 = require("cloudinary");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCarIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    //creating car
    const imageName = `${Math.floor(Math.random() * 1000)}${payload.name}`;
    let imageUrlList = [];
    for (let i = 0; i < file.length; i++) {
        let locaFilePath = file[i].path;
        const result = yield cloudinary_1.v2.uploader.upload(locaFilePath, {
            public_id: imageName
        });
        // Upload the local image to Cloudinary
        // and get image url as response
        // let result = await uploadToCloudinary(locaFilePath);
        imageUrlList.push(result.url);
    }
    console.log(file);
    console.log(imageUrlList);
    const carData = Object.assign(Object.assign({}, payload), { images: imageUrlList });
    const result = yield car_model_1.Car.create(carData);
    return result;
});
const getCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //getting all cars
    const carQuery = yield new QueryBuilder_1.QueryBuilder(car_model_1.Car.find(), query).search(['name', 'description']).filter().sort().paginate();
    const result = carQuery.modelQuery;
    return result;
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //getting single car with id
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const upddateSingleCarIntoDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload");
    //updating car
    const isCarExits = yield car_model_1.Car.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not exits");
    }
    let imageUrlList = [];
    if (file.length > 0) {
        const imageName = `${Math.floor(Math.random() * 1000)}${payload.name}`;
        for (let i = 0; i < file.length; i++) {
            let locaFilePath = file[i].path;
            console.log(locaFilePath, "locaFilePath");
            const result = yield cloudinary_1.v2.uploader.upload(locaFilePath, {
                public_id: imageName
            });
            // Upload the local image to Cloudinary
            // and get image url as response
            // let result = await uploadToCloudinary(locaFilePath);
            imageUrlList.push(result.url);
        }
    }
    console.log(file, "file");
    console.log(imageUrlList);
    const carData = Object.assign(Object.assign({}, payload), { images: imageUrlList });
    const result = yield car_model_1.Car.findByIdAndUpdate(id, carData, {
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
    const result = yield car_model_1.Car.findOneAndDelete({ _id: id });
    console.log('deleteCar', result);
    return result;
});
const returnCarIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //returing car by adding total and end time
    const booking = yield booking_model_1.Booking.findById(payload.bookingId);
    console.log(booking, "booking");
    const startTime = booking === null || booking === void 0 ? void 0 : booking.startTime;
    const resTotal = (0, car_utils_1.default)(startTime, payload.endTime, booking === null || booking === void 0 ? void 0 : booking.costWithFeature); //total cost getting by this 
    const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: payload.bookingId }, {
        endTime: payload.endTime,
        totalCost: resTotal,
        returnCar: true
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
