import 'dotenv/config';

export const dbConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    url: process.env.DATABASE_URL,
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'nest_boiler_plate',
    ssl: process.env.DATABASE_SSL === 'true' || isProduction,
  };
};
