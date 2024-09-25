
import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";


const carSchema = new Schema<TCar>({
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
    },
    images: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
    },
    model: {
        type: String
    },
    year: {
        type: String
    }
}, { timestamps: true });

export const Car = model<TCar>('Car', carSchema);