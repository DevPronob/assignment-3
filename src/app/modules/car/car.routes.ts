import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarValidation } from './car.validation'
import { CarControllers } from './car.controller'
import auth from '../../middlewares/auth'
import { USER_Role } from '../user/user.Constant'

const router = express.Router()


router.post('/', auth(USER_Role.ADMIN), validateRequest(CarValidation.carValidationSchema), CarControllers.createCar)
router.get('/', CarControllers.getCars)
router.get('/:id', CarControllers.getSingleCar)
router.put('/return', CarControllers.returnCar)
router.put('/:id', auth(USER_Role.ADMIN), validateRequest(CarValidation.updateCarValidationSchema), CarControllers.updateSingleCar)
router.delete('/:id', auth(USER_Role.ADMIN), CarControllers.deleteSingleCar)


export const CarRoutes = router