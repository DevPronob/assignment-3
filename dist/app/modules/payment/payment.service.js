"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const payment_model_1 = require("./payment.model");
const uuid_1 = require("uuid");
const car_model_1 = require("../car/car.model");
const sslcommerz_1 = require("sslcommerz");
const booking_model_1 = require("../booking/booking.model");
// Function to create a payment
const createPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload");
    const { car, customerName, customerEmail, phone, amount, address } = payload;
    console.log(payload, "item key");
    const carData = yield car_model_1.Car.findOne({ _id: car });
    if (!carData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car not found');
    }
    console.log(payload, "pqayload");
    const productInfo = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: (0, uuid_1.v4)(),
        success_url: `https://car-rental-app-ruby.vercel.app/api/payment/success`,
        fail_url: `https://car-rental-app-ruby.vercel.app/api/payment/failure`,
        cancel_url: `https://car-rental-app-ruby.vercel.app/api/payment/cancel`,
        ipn_url: `https://car-rental-app-ruby.vercel.app/api/payment/ipn`,
        paymentStatus: 'pending',
        product_name: carData === null || carData === void 0 ? void 0 : carData.name,
        cus_name: customerName,
        cus_email: customerEmail,
        product_profile: 'non-physical-goods',
        cus_add1: address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        product_category: 'car',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phone,
        cus_fax: '01711111111',
        ship_name: customerName,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D',
        shipping_method: 'NO',
    };
    const newPayment = new payment_model_1.Payment({
        carId: carData._id,
        customerName,
        customerEmail,
        phone,
        amount,
        address,
        tran_id: productInfo.tran_id,
        status: 'pending'
    });
    yield newPayment.save();
    // Initialize SSLCommerz payment gateway without `new` keyword
    const sslcommer = new sslcommerz_1.SslCommerzPayment('ccc66f3af6144f2b', 'ccc66f3af6144f2b@ssl', false); // false for sandbox, true for live
    try {
        const paymentInit = yield sslcommer.init(productInfo);
        console.log(paymentInit);
        if (paymentInit.GatewayPageURL) {
            const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: payload.bookingId, }, // Query
            { payment: true }, // Update
            {
                new: true,
                runValidators: true
            });
            console.log(result);
            return { payment_url: paymentInit.GatewayPageURL };
        }
        else {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Payment initiation not successful");
        }
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "SSLCommerz payment initiation failed");
    }
});
const getPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const totalRevenue = yield payment_model_1.Payment.aggregate([
        // {
        //     $match: { pay_status: "completed" } 
        // },
        {
            $group: {
                _id: null, // Group all payments
                totalRevenue: { $sum: "$amount" }
            }
        }
    ]);
    return ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
const getPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find({ tran_id: payload }).populate('car');
    return result;
});
// Exported services
exports.PaymentServices = {
    createPayment,
    getPayments,
    getPayment
};
