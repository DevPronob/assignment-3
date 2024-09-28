"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_Constant_1 = require("./user.Constant");
const router = express_1.default.Router();
router.put('/change-password', (0, auth_1.default)(user_Constant_1.USER_Role.USER), user_controller_1.UserControllers.changePassword);
router.get('/', (0, auth_1.default)(user_Constant_1.USER_Role.ADMIN), user_controller_1.UserControllers.getUsers);
router.put('/:id', (0, auth_1.default)(user_Constant_1.USER_Role.ADMIN, user_Constant_1.USER_Role.USER), user_controller_1.UserControllers.updateUsers);
router.get('/me', (0, auth_1.default)(user_Constant_1.USER_Role.USER), user_controller_1.UserControllers.getMe);
exports.UserRoutes = router;
