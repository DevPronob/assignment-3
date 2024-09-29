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
exports.CarControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilits/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utilits/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const car_service_1 = require("./car.service");
const createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    const result = yield car_service_1.CarServices.createCarIntoDB(req.body, req.files);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Car created successfully',
        data: result
    });
}));
const getCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user, "bookings");
    const result = yield car_service_1.CarServices.getCarsFromDB(req.query);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cars retrieved successfully',
        data: result
    });
}));
const getSingleCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarServices.getSingleCarFromDB(id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'A Car retrieved successfully',
        data: result
    });
}));
const updateSingleCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body, req.files, "ffff");
    if (req.files) {
        console.log(req.files, "files");
    }
    if (req.body.data) {
        req.body = JSON.parse(req.body.data);
    }
    const result = yield car_service_1.CarServices.upddateSingleCarIntoDB(id, req.body, req.files);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car updated successfully',
        data: result
    });
}));
const deleteSingleCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarServices.deleteSingleCarIntoDB(id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car Deleted successfully',
        data: result
    });
}));
const returnCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.CarServices.returnCarIntoDB(req.body);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car returned successfully',
        data: result
    });
}));
exports.CarControllers = {
    createCar,
    getCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar,
    returnCar
};
