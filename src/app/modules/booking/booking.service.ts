import { ObjectId, Types } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
const { ObjectId } = Types;
const createBookingIntoDB = async (payload: TBooking, userId?: string) => {

    console.log(payload)
    // Create the booking 
    const data = {
        ...payload,
        user: userId,
        car: payload.car
    }
    const booking = new Booking(data);
    console.log(booking)
    // Save the booking 
    await (await booking.populate('user')).populate('car');
    const result = await booking.save();

    return result;
};

const getBookingsFromDB = async (payload: Record<string, unknown>) => {

    //getting all bookings
    console.log(payload, ":qurey")
    const query = new QueryBuilder(Booking.find({}).populate('user').populate('car'), payload)
        .filter()

    const result = await query.modelQuery;
    return result
};
const getMyBookingsFromDB = async (id?: string) => {
    //getting user bookings
    const objectId = new ObjectId(id);
    console.log(objectId)
    // Query the database using the ObjectId
    const result = Booking.find({ user: objectId }).populate('user').populate('car')

    return result;
};


const updateBooking = async (id: string, payload: Partial<TBooking>) => {
    const isCarExits = await Booking.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Booking is not exits")
    }
    console.log(payload, id, "all")
    const result = await Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result

}


const deleteBooking = async (id: string) => {
    //soft deletting car with id
    const isCarExits = await Booking.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")
    }

    const result = await Booking.findOneAndDelete({ _id: id })
    return result
};



export const BookingsServices = {
    createBookingIntoDB,
    getBookingsFromDB,
    getMyBookingsFromDB,
    updateBooking,
    deleteBooking
}
