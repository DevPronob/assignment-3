"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
