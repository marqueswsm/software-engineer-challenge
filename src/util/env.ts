import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  httpActive: process.env.HTTP_ACTIVE === 'true',
  httpPort: process.env.HTTP_PORT || '3000',
};

export { env };
