import { RateLimits } from '../common/constants/app.constants';
import 'dotenv/config';

export const getAppConfig = () => {
  return {
    port: Number.parseInt(process.env.PORT || '3000', 10),
    env: process.env.APP_ENV || 'development',
    debug: process.env.APP_DEBUG === 'true' || false,
    rate_limit: RateLimits,
  };
};
