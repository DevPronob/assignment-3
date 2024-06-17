import { QueryBuilder } from "../../builder/QueryBuilder";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking, userId?: string) => {
    const { date, car, startTime } = payload;

    // Create the booking 
    const booking = new Booking({
        date,
        user: userId,
        car,
        startTime,
    });

    // Save the booking 
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
    const result = await Booking.findById(id).populate('user').populate('car')
    return result
};


export const BookingsServices = {
    createBookingIntoDB,
    getBookingsFromDB,
    getMyBookingsFromDB
}
