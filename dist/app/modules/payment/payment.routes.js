"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_Constant_1 = require("../user/user.Constant");
const payment_controller_1 = require("./payment.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_Constant_1.USER_Role.USER), payment_controller_1.PayementControllers.createPayment);
router.post('/success', payment_controller_1.PayementControllers.successPayment);
router.post('/failure', payment_controller_1.PayementControllers.failPayment);
router.post('/cancel', payment_controller_1.PayementControllers.canclePayment);
router.post('/ipn', payment_controller_1.PayementControllers.cpnPayment);
router.get('/', payment_controller_1.PayementControllers.getPayments);
router.get('/my-payment/:id', payment_controller_1.PayementControllers.getPayment);
exports.PaymentRoutes = router;
