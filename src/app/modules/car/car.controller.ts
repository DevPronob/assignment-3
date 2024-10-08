import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendRespons";
import httpStatus from 'http-status';
import { CarServices } from "./car.service";

const createCar = catchAsync(
    async (req, res) => {
        console.log(req.files)
        const result = await CarServices.createCarIntoDB(req.body, req.files);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Car created successfully',
            data: result
        })


    }
)

const getCars = catchAsync(
    async (req, res) => {
        console.log(req.user, "bookings")
        const result = await CarServices.getCarsFromDB(req.query);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Cars retrieved successfully',
            data: result
        })


    }
)
const getSingleCar = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await CarServices.getSingleCarFromDB(id);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'A Car retrieved successfully',
            data: result
        })


    }
)

const updateSingleCar = catchAsync(
    async (req, res) => {
        const { id } = req.params
        console.log(req.body, req.files, "ffff")
        if (req.files) {
            console.log(req.files, "files")
        }
        if (req.body.data) {
            req.body = JSON.parse(req.body.data)
        }
        const result = await CarServices.upddateSingleCarIntoDB(id, req.body, req.files);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Car updated successfully',
            data: result
        })


    }
)

const deleteSingleCar = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await CarServices.deleteSingleCarIntoDB(id);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Car Deleted successfully',
            data: result
        })


    }
)

const returnCar = catchAsync(
    async (req, res) => {
        const result = await CarServices.returnCarIntoDB(req.body);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Car returned successfully',
            data: result
        })


    }
)





export const CarControllers = {
    createCar,
    getCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar,
    returnCar
}