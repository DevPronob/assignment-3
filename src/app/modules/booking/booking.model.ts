
import mongoose, { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: {
        type: String,

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export const Booking = model<TBooking>('Booking', bookingSchema);