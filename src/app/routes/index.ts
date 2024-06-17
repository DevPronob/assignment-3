
import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CarRoutes } from "../modules/car/car.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";

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


]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

export default router