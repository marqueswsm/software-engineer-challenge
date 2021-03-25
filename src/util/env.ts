import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  httpActive: process.env.HTTP_ACTIVE === 'true',
  httpPort: process.env.PORT || '3000',

  mongoURI: process.env.MONGO_URI || '',
};

export { env };
