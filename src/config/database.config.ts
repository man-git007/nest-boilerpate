import "dotenv/config";

export const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'nest_boiler_plate',
    schema: process.env.DB_SCHEMA || 'public',
    ssl: process.env.DB_SSL === 'true' || isProduction,
    maxConnections: Number.parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
    connectionTimeout: Number.parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000', 10),
  };
};