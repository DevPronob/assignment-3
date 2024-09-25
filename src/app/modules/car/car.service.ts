/* eslint-disable prefer-const */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { Booking } from "../booking/booking.model";
import totalCost from "./car.utils";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { v2 as cloudinary } from 'cloudinary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCarIntoDB = async (payload: any, file: any) => {
    //creating car
    const imageName = `${Math.floor(Math.random() * 1000)}${payload.name}`
    let imageUrlList = [];
    for (let i = 0; i < file.length; i++) {
        let locaFilePath = file[i].path;
        const result = await cloudinary.uploader.upload(locaFilePath, {
            public_id: imageName
        });
        // Upload the local image to Cloudinary
        // and get image url as response
        // let result = await uploadToCloudinary(locaFilePath);
        imageUrlList.push(result.url);
    }
    console.log(file)
    console.log(imageUrlList)

    const carData = {
        ...payload,
        images: imageUrlList
    }



    const result = await Car.create(carData)
    return result
};

const getCarsFromDB = async (query: Record<string, unknown>) => {

    //getting all cars
    const carQuery = await new QueryBuilder(Car.find(), query).search(['name', 'description']).filter().sort().paginate()
    const result = carQuery.modelQuery
    return result
};
const getSingleCarFromDB = async (id: string) => {

    //getting single car with id
    const result = await Car.findById(id)
    return result
};

const upddateSingleCarIntoDB = async (id: string, payload: Partial<TCar>, file: any) => {
    console.log(payload, "payload")
    //updating car
    const isCarExits = await Car.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")


    }
    let imageUrlList = [];

    if (file.length > 0) {

        const imageName = `${Math.floor(Math.random() * 1000)}${payload.name}`

        for (let i = 0; i < file.length; i++) {
            let locaFilePath = file[i].path;
            console.log(locaFilePath, "locaFilePath")
            const result = await cloudinary.uploader.upload(locaFilePath, {
                public_id: imageName
            });
            // Upload the local image to Cloudinary
            // and get image url as response
            // let result = await uploadToCloudinary(locaFilePath);
            imageUrlList.push(result.url);
        }
    }
    console.log(file, "file")
    console.log(imageUrlList)
    const carData = {
        ...payload,
        images: imageUrlList
    }

    const result = await Car.findByIdAndUpdate(id, carData, {
        new: true,
        runValidators: true
    })
    return result
};

const deleteSingleCarIntoDB = async (id: string) => {
    //soft deletting car with id
    const isCarExits = await Car.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")
    }

    const result = await Car.findOneAndDelete({ _id: id })
    console.log('deleteCar', result)
    return result
};

const returnCarIntoDB = async (payload: { bookingId: string, endTime: string }) => {
    //returing car by adding total and end time
    const booking = await Booking.findById(payload.bookingId)
    console.log(booking, "booking")
    const startTime = booking?.startTime
    const resTotal = totalCost(startTime, payload.endTime, booking?.costWithFeature) //total cost getting by this 
    const result = await Booking.findOneAndUpdate(
        { _id: payload.bookingId },
        {
            endTime: payload.endTime,
            totalCost: resTotal,
            returnCar: true
        },
        { new: true }
    )

    return result
};




export const CarServices = {
    createCarIntoDB,
    getCarsFromDB,
    getSingleCarFromDB,
    upddateSingleCarIntoDB,
    deleteSingleCarIntoDB,
    returnCarIntoDB
}