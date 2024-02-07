import { config } from 'dotenv';

config();
export const databaseConfig = {
    dialect: 'mysql',
    host: process.env.HOST,
    port: process.env.PORT,
    pool:{
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000,
    },
}