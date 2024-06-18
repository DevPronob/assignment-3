"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_Constant_1 = require("../user/user.Constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_Constant_1.USER_Role.USER), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.createbookingValidation), booking_controller_1.BookingControllers.createBooking);
// router.post('/', validateRequest(UserValidations.loginUserValidationSchema), AuthControllers.login);
router.get('/', (0, auth_1.default)(user_Constant_1.USER_Role.ADMIN), booking_controller_1.BookingControllers.getBookings);
router.get('/my-bookings', (0, auth_1.default)(user_Constant_1.USER_Role.USER), booking_controller_1.BookingControllers.getUserBookings);
// router.patch('/get-academic-semester/:id', AcademicFacultyControllers.updateSingleAcademicFaculty);
exports.bookingRoutes = router;
