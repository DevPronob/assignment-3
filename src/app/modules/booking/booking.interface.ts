import { ObjectId } from "mongoose"

export type TBooking = {
    date: string,
    user: ObjectId,
    car?: ObjectId;
    carId: ObjectId
    startTime: string;
    endTime: string;
    totalCost: number;
    pickUpLocation: string;
    costWithFeature: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    customerDetails: {
        name: string;
        email: string;
        nid: string;
        drivingLicense: string;
    },
    additationalFeatures: {
        gps: boolean;
        childSeat: string;
        mobileWifi: string;
    },
    returnCar: boolean;
    payment: boolean
}