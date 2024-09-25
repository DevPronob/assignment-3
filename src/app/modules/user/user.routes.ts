import express from 'express'
import { UserControllers } from './user.controller'

import auth from '../../middlewares/auth'
import { USER_Role } from './user.Constant'

const router = express.Router()

router.put('/change-password', auth(USER_Role.USER), UserControllers.changePassword)
router.get('/', auth(USER_Role.ADMIN), UserControllers.getUsers)
router.put('/:id', auth(USER_Role.ADMIN, USER_Role.USER), UserControllers.updateUsers)
router.get('/me', auth(USER_Role.USER), UserControllers.getMe)



export const UserRoutes = router