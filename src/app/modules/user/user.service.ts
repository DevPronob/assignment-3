import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { User } from "./user.model"
import { TUser } from "./user.interface"

import bcrypt from 'bcrypt';
import config from "../../config";


const updateUser = async (id: string, payload: Partial<TUser>) => {
    console.log(payload, "payload")
    const isCarExits = await User.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not exits")
    }
    console.log(payload, id, "all")
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result

}

const getUsers = async () => {
    const result = await User.find({})
    return result
}
const getMe = async (email: string) => {
    const result = await User.findOne({ email: email })
    return result
}

const changePasswordfromdb = async (userData: string, payload: { oldPassword: string; newPassword: string }) => {
    console.log(payload.oldPassword, payload.newPassword, 'from service');
    console.log(userData, 'from service');

    // Find the user by custom ID
    const user = await User.isUserExistsByCustomId(userData);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // Check if the old password matches the stored password
    const isMatch = await User.isPasswordMatched(payload.oldPassword, user.password);
    if (!isMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Old password does not match');
    }
    console.log(isMatch, "Password match");

    // Ensure bcrypt salt rounds are configured correctly
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;

    // Hash the new password with salt rounds
    const newHashedPassword = await bcrypt.hash(payload.newPassword, saltRounds);
    console.log(newHashedPassword, "New hashed password");

    // Update the user's password in the database
    await User.findOneAndUpdate(
        { _id: user._id }, // Query
        { password: newHashedPassword } // Update
    );

    return { message: 'Password updated successfully' };
}



export const UserServices = {
    updateUser,
    getUsers,
    getMe,
    changePasswordfromdb
}



