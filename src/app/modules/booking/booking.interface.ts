import { ObjectId } from "mongoose"

export type TBooking = {
    date: string,
    user: ObjectId,
    car?: ObjectId;
    carId: ObjectId
    startTime: string;
    endTime: string;
    totalCost: number;
}