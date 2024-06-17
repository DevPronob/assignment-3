import { ObjectId, Types } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
const { ObjectId } = Types;
const createBookingIntoDB = async (payload: TBooking, userId?: string) => {
    const { date, carId, startTime } = payload;

    // Create the booking 
    const booking = new Booking({
        date,
        user: userId,
        car: carId,
        startTime,
    });

    // Save the booking 
    await (await booking.populate('user')).populate('car');
    const result = await booking.save();

    return result;
};

const getBookingsFromDB = async (payload: Record<string, unknown>) => {

    //getting all bookings
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
    const result = await Booking.find({ user: objectId }).populate('user').populate('car');
    return result;
};


export const BookingsServices = {
    createBookingIntoDB,
    getBookingsFromDB,
    getMyBookingsFromDB
}
