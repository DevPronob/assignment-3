"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    color: {
        type: String,
    },
    isElectric: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    features: {
        type: [String],
        default: []
    },
    pricePerHour: {
        type: Number,
        required: [true, "Price per hour is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Car = (0, mongoose_1.model)('Car', carSchema);
