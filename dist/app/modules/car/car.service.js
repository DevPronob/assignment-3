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
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("./car.model");
const booking_model_1 = require("../booking/booking.model");
const car_utils_1 = __importDefault(require("./car.utils"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const cloudinary_1 = require("cloudinary");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-undef
const createCarIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Upload all images in parallel using Promise.all
        const imageUrlList = yield Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        file.map((file, i) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
                }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result === null || result === void 0 ? void 0 : result.secure_url); // Resolve with the image URL
                });
                uploadStream.end(file.buffer); // Upload from memory buffer
            });
        }));
        console.log('Uploaded files:', imageUrlList); // Image URLs
        // Create the car data with the uploaded image URLs
        const carData = Object.assign(Object.assign({}, payload), { images: imageUrlList });
        // Save the car data to the database
        const result = yield car_model_1.Car.create(carData);
        return result;
    }
    catch (error) {
        console.error('Error uploading images:', error);
        throw new Error('Failed to upload images');
    }
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upddateSingleCarIntoDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, file, "payload");
    const isCarExits = yield car_model_1.Car.findById(id);
    if (!isCarExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not exits");
    }
    const imageUrlList = yield Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file.map((file, i) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result === null || result === void 0 ? void 0 : result.secure_url); // Resolve with the image URL
            });
            uploadStream.end(file.buffer); // Upload from memory buffer
        });
    }));
    console.log('Uploaded files:', imageUrlList); // Image URLs
    const carData = Object.assign(Object.assign({}, payload), { images: imageUrlList });
    console.log(carData, "updateCar Data");
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
// import multer from 'multer';
// import cloudinary from 'cloudinary'; // Ensure you have Cloudinary SDK setup
// // Set up multer for in-memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// app.post('/upload', upload.array('files'), async (req, res) => {
//     const files = req.files as Express.Multer.File[];
//     const payload = req.body;
//     let imageUrlList = [];
//     // Loop through files and upload each one to Cloudinary
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         // Upload file buffer to Cloudinary (in-memory)
//         await new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 {
//                     public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
//                 },
//                 (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     imageUrlList.push(result?.secure_url);
//                     resolve(result);
//                 }
//             );
//             uploadStream.end(file.buffer); // Upload from memory buffer
//         });
//     }
//     // Return uploaded image URLs to the client
//     res.status(200).json({
//         message: 'Upload successful',
//         images: imageUrlList,
//     });
// });
