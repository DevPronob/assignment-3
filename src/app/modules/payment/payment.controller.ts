import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendRespons";
import { PaymentServices } from "./payment.service";
import { Payment } from "./payment.model";



const createPayment = catchAsync(
    async (req, res) => {
        console.log(req.files)
        const result = await PaymentServices.createPayment(req.body);
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Payment created successfully',
            data: result
        })


    }
)

const getPayments = catchAsync(
    async (req, res) => {
        const result = await PaymentServices.getPayments();
        return sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Payment rectrive successfully',
            data: result
        })


    }
)

const successPayment = catchAsync(
    async (req, res) => {
        const { tran_id } = req.body;

        try {
            const result = await Payment.findOneAndUpdate(
                { tran_id: tran_id }, // Query
                { status: 'completed' }, // Update
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!result) {
                return res.status(404).send("Payment not found");
            }

            res.status(302).redirect(`http://localhost:5173/success/${tran_id}`);
        } catch (error) {
            console.error("Error updating order on success:", error);
            res.status(500).send("Internal Server Error");
        }
    }

)


const failPayment = catchAsync(
    async (req, res) => {
        const result = await Payment.findOneAndDelete({ tran_id: req.body.tran_id })

        res.redirect(`http://localhost:5173`)

    }
)

const canclePayment = catchAsync(
    async (req, res) => {
        const result = await Payment.findOneAndDelete({ tran_id: req.body.tran_id })

        res.redirect(`http://localhost:5173`)

    }
)

const cpnPayment = catchAsync(
    async (req, res) => {
        console.log(req.body)
        res.send(req.body);

    }
)



export const PayementControllers = {
    createPayment,
    successPayment,
    failPayment,
    getPayments,
    canclePayment,
    cpnPayment
}