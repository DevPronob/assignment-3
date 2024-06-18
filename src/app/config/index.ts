import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

const config = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGO_URL,
    bcrypt_salt_rounds: process.env.SALT_ROUND,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET
};

export default config;
