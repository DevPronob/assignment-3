"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_validation_1 = require("./car.validation");
const car_controller_1 = require("./car.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_Constant_1 = require("../user/user.Constant");
const sendImageToCloudinary_1 = __importDefault(require("../../utilits/sendImageToCloudinary"));
const router = express_1.default.Router();
router.post('/', sendImageToCloudinary_1.default, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(car_validation_1.CarValidation.carValidationSchema), car_controller_1.CarControllers.createCar);
router.get('/', car_controller_1.CarControllers.getCars);
router.get('/:id', car_controller_1.CarControllers.getSingleCar);
router.put('/return', car_controller_1.CarControllers.returnCar);
router.put('/:id', sendImageToCloudinary_1.default, (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(car_validation_1.CarValidation.updateCarValidationSchema), car_controller_1.CarControllers.updateSingleCar);
router.delete('/:id', (0, auth_1.default)(user_Constant_1.USER_Role.ADMIN), car_controller_1.CarControllers.deleteSingleCar);
exports.CarRoutes = router;
