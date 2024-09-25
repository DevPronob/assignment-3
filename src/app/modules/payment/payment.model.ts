
import { model, Schema } from "mongoose";

import { TPayment } from "./payment.interface";


const paymentSchema = new Schema<TPayment>({
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
    },
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    phone: {
        type: String,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
    },
    pay_time: {
        type: String,
    },
    tran_id: {
        type: String,
    },
    address: {
        type: String
    }
}, { timestamps: true });

export const Payment = model<TPayment>('Payment', paymentSchema);


