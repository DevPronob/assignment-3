import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: 0
    },
    phone: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next()
})
// userSchema.post('save', async function (doc, next) {
//     doc.password = ''
//     next()
// })

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    console.log(email)
    return await this.findOne({ email: email }).select('+password');
}

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
