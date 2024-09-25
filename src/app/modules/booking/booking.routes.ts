import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_Role } from '../user/user.Constant';


const router = express.Router();



router.post('/', auth(USER_Role.USER), validateRequest(bookingValidation.createbookingValidation), BookingControllers.createBooking);
router.get('/', auth(USER_Role.ADMIN), BookingControllers.getBookings);
router.put('/:id', auth(USER_Role.ADMIN), validateRequest(bookingValidation.updateBookingValidation), BookingControllers.updateBooking);
router.get('/my-bookings', auth(USER_Role.USER), BookingControllers.getUserBookings);
router.delete('/:id', auth(USER_Role.USER), BookingControllers.deleteBooking);


export const bookingRoutes = router;