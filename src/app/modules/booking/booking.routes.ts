import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_Role } from '../user/user.Constant';


const router = express.Router();



router.post('/', auth(USER_Role.USER), validateRequest(bookingValidation.createbookingValidation), BookingControllers.createBooking);
// router.post('/', validateRequest(UserValidations.loginUserValidationSchema), AuthControllers.login);
router.get('/', auth(USER_Role.ADMIN), BookingControllers.getBookings);
router.get('/my-bookings', auth(USER_Role.USER), BookingControllers.getUserBookings);
// router.patch('/get-academic-semester/:id', AcademicFacultyControllers.updateSingleAcademicFaculty);

export const bookingRoutes = router;