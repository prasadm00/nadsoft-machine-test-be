/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'POSTGRES_USERNAME',
  'POSTGRES_HOST',
  'POSTGRES_DATABASE',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
  'PORT',
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
});

const getEnvVariable = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable missing: ${key}`);
  }
  return value;
};

const config = {
  database: {
    user: getEnvVariable('POSTGRES_USERNAME'),
    password: getEnvVariable('POSTGRES_PASSWORD'),
    host: getEnvVariable('POSTGRES_HOST'),
    port: parseInt(getEnvVariable('POSTGRES_PORT'), 10),
    name: getEnvVariable('POSTGRES_DATABASE'),
  },
  server: {
    port: parseInt(getEnvVariable('PORT'), 10),
  },
};

export default config;
