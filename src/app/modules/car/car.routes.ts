import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarValidation } from './car.validation'
import { CarControllers } from './car.controller'
import auth from '../../middlewares/auth'
import { USER_Role } from '../user/user.Constant'
import uploadMiddleware from '../../utilits/sendImageToCloudinary'


const router = express.Router()


router.post('/', uploadMiddleware, (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
}, validateRequest(CarValidation.carValidationSchema), CarControllers.createCar);

router.get('/', CarControllers.getCars)
router.get('/:id', CarControllers.getSingleCar)
router.put('/return', CarControllers.returnCar)
router.put('/:id', uploadMiddleware, validateRequest(CarValidation.updateCarValidationSchema), CarControllers.updateSingleCar)
router.delete('/:id', auth(USER_Role.ADMIN), CarControllers.deleteSingleCar)


export const CarRoutes = router