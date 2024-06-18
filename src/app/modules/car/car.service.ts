import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { Booking } from "../booking/booking.model";
import totalCost from "./car.utils";

const createCarIntoDB = async (payload: TCar) => {

    //creating car
    console.log(payload, "payload")
    const result = await Car.create(payload)
    return result
};

const getCarsFromDB = async () => {

    //getting all cars
    const result = await Car.find()
    return result
};
const getSingleCarFromDB = async (id: string) => {

    //getting single car with id
    const result = await Car.findById(id)
    return result
};

const upddateSingleCarIntoDB = async (id: string, payload: Partial<TCar>) => {
    //updating car
    const isCarExits = await Car.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")
    }

    const result = await Car.findByIdAndUpdate(id, payload, {
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

    const result = await Car.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    })
    return result
};

const returnCarIntoDB = async (payload: { bookingId: string, endTime: string }) => {
    //returing car by adding total and end time
    const booking = await Booking.findById(payload.bookingId)
    console.log(booking, "booking")
    const startTime = booking?.startTime
    const car = await Car.findById(booking?.car)
    const resTotal = totalCost(startTime, payload.endTime, car?.pricePerHour) //total cost getting by this 
    const result = await Booking.findOneAndUpdate(
        { _id: payload.bookingId },
        {
            endTime: payload.endTime,
            totalCost: resTotal
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