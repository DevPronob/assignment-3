import auth from "../../middlewares/auth"
import { USER_Role } from "../user/user.Constant"
import { PayementControllers } from "./payment.controller"
import express from 'express'

const router = express.Router()


router.post('/', auth(USER_Role.USER), PayementControllers.createPayment)
router.post('/success', PayementControllers.successPayment)
router.post('/failure', PayementControllers.failPayment)
router.post('/cancel', PayementControllers.canclePayment)
router.post('/ipn', PayementControllers.cpnPayment)
router.get('/', PayementControllers.getPayments)


export const PaymentRoutes = router