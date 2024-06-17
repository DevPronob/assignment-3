import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();



router.post('/signup', validateRequest(UserValidations.createUserValidationSchema), AuthControllers.signup);
router.post('/signin', validateRequest(UserValidations.loginUserValidationSchema), AuthControllers.login);
// router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
// router.patch('/get-academic-semester/:id', AcademicFacultyControllers.updateSingleAcademicFaculty);

export const AuthRoutes = router;