import dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.PORT,
    mongodb_url: process.env.MONGO_URL,
    bcrypt_salt_rounds: process.env.SALT_ROUND,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secrect: process.env.JWT_SECRECT
};
