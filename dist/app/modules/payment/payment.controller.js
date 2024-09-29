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
exports.PayementControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilits/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utilits/sendRespons"));
const payment_service_1 = require("./payment.service");
const payment_model_1 = require("./payment.model");
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    const result = yield payment_service_1.PaymentServices.createPayment(req.body);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Payment created successfully',
        data: result
    });
}));
const getPayments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentServices.getPayments();
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Payment rectrive successfully',
        data: result
    });
}));
const successPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id } = req.body;
    try {
        const result = yield payment_model_1.Payment.findOneAndUpdate({ tran_id: tran_id }, // Query
        { status: 'completed' }, // Update
        {
            new: true,
            runValidators: true
        });
        if (!result) {
            return res.status(404).send("Payment not found");
        }
        res.status(302).redirect(`https://car-rental-app-client-10.vercel.app/success/${tran_id}`);
    }
    catch (error) {
        console.error("Error updating order on success:", error);
        res.status(500).send("Internal Server Error");
    }
}));
const failPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findOneAndDelete({ tran_id: req.body.tran_id });
    res.redirect(`https://car-rental-app-client-10.vercel.app`);
}));
const canclePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findOneAndDelete({ tran_id: req.body.tran_id });
    res.redirect(`https://car-rental-app-client-10.vercel.app`);
}));
const cpnPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.send(req.body);
}));
const getPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield payment_service_1.PaymentServices.getPayment(id);
    return (0, sendRespons_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Payment rectrive successfully',
        data: result
    });
}));
exports.PayementControllers = {
    createPayment,
    successPayment,
    failPayment,
    getPayments,
    canclePayment,
    cpnPayment,
    getPayment
};
