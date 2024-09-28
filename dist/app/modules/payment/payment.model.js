"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
