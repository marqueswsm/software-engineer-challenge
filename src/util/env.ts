import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  httpActive: process.env.HTTP_ACTIVE === 'true',
  httpPort: process.env.HTTP_PORT || '3000',

  mongoPassword: process.env.MONGO_PASSWORD,
  mongoUserName: process.env.MONGO_USERNAME,
  mongoAuthSource: process.env.MONGO_AUTH_SOURCE,
};

export { env };
