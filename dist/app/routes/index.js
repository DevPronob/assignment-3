"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const car_routes_1 = require("../modules/car/car.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes
    },
    {
        path: '/cars',
        route: car_routes_1.CarRoutes
    },
    {
        path: '/bookings',
        route: booking_routes_1.bookingRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);
exports.default = router;
