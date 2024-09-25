
import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CarRoutes } from "../modules/car/car.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";

const router = Router()
const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/cars',
        route: CarRoutes
    },
    {
        path: '/bookings',
        route: bookingRoutes
    },

    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/payment',
        route: PaymentRoutes
    },


]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router