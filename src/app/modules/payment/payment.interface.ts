/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongoose";

export type TPayment = {
    bookingId: any;
    car: ObjectId,
    customerName: string,
    key: string,
    customerEmail: string,
    phone: string,
    amount: number,
    status?: string;
    pay_time?: string;
    tran_id?: string;
    address: string;
}