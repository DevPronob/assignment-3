
import { model, Schema } from "mongoose";
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
    costWithFeature: {
        type: Number,
        default: 0
    },
    pickUpLocation: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        nid: {
            type: String,
            required: true
        },
        drivingLicense: {
            type: String,
            required: true
        },

    },
    additationalFeatures: {
        gps: {
            type: Boolean,
            default: false
        },
        childSeat: {
            type: Boolean,
            default: false
        },
        mobileWifi: {
            type: Boolean,
            default: false
        },
    },
    returnCar: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Booking = model<TBooking>('Booking', bookingSchema);
