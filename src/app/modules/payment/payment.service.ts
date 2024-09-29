import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import { v4 as uuid } from "uuid";
import { Car } from "../car/car.model";
import { SslCommerzPayment as SSLCommerzPayment } from 'sslcommerz';
import { Booking } from "../booking/booking.model";


// Function to create a payment
const createPayment = async (payload: TPayment) => {
    console.log(payload, "payload")
    const { car, customerName, customerEmail, phone, amount, address } = payload;
    console.log(payload, "item key")
    const carData = await Car.findOne({ _id: car });

    if (!carData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
    }
    console.log(payload, "pqayload")


    const productInfo = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: uuid(),
        success_url: `https://car-rental-app-ruby.vercel.app/api/payment/success`,
        fail_url: `https://car-rental-app-ruby.vercel.app/api/payment/failure`,
        cancel_url: `https://car-rental-app-ruby.vercel.app/api/payment/cancel`,
        ipn_url: `https://car-rental-app-ruby.vercel.app/api/payment/ipn`,
        paymentStatus: 'pending',
        product_name: carData?.name,
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

    const newPayment = new Payment({
        carId: carData._id,
        customerName,
        customerEmail,
        phone,
        amount,
        address,
        tran_id: productInfo.tran_id,
        status: 'pending'
    });
    await newPayment.save();

    // Initialize SSLCommerz payment gateway without `new` keyword
    const sslcommer = new SSLCommerzPayment('ccc66f3af6144f2b', 'ccc66f3af6144f2b@ssl', false); // false for sandbox, true for live
    try {
        const paymentInit = await sslcommer.init(productInfo);
        console.log(paymentInit)
        if (paymentInit.GatewayPageURL) {
            const result = await Booking.findOneAndUpdate(
                { _id: payload.bookingId, }, // Query
                { payment: true }, // Update
                {
                    new: true,
                    runValidators: true
                }
            );
            console.log(result)
            return { payment_url: paymentInit.GatewayPageURL };
        } else {
            throw new AppError(httpStatus.CONFLICT, "Payment initiation not successful");
        }
    } catch (error) {
        console.error(error);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "SSLCommerz payment initiation failed");
    }

};




const getPayments = async () => {
    const totalRevenue = await Payment.aggregate([
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

    return totalRevenue[0]?.totalRevenue || 0;
}

const getPayment = async (payload: string) => {
    const result = await Payment.find({ tran_id: payload }).populate('car')

    return result
}


// Exported services
export const PaymentServices = {
    createPayment,
    getPayments,
    getPayment
};
