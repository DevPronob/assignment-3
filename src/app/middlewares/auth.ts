import { NextFunction, Request, Response } from "express"
import catchAsync from "../utilits/catchAsync"
import AppError from "../errors/AppError"
import httpStatus from "http-status"

import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config"
import { User } from "../modules/user/user.model"
import { USER_Role, UserRole } from "../modules/user/user.Constant"

const auth = (...userRoles: UserRole[]) => {
    console.log(userRoles)
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
        }
        const VerityToken = token.split(" ")[1];
        console.log("Token from headers:", token); // Log the token
        const decoded = jwt.verify(
            VerityToken,
            config.jwt_secrect as string,
        ) as JwtPayload;
        if (!decoded) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
        }

        console.log(decoded)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "You Are not looged in")
        }
        console.log(userRoles, user.role, "k")
        if (userRoles && !userRoles.includes(user.role)) {
            throw new AppError(401, "You have no access to this route");
        }

        req.user = decoded as JwtPayload

        next()

    })
}
export default auth