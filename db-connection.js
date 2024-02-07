import { DataTypes, Sequelize } from 'sequelize';
import { databaseConfig } from './db-config.js';
import { config } from 'dotenv';

config();
const db = process.env.DB_NAME;
const user = process.env.USER;
const password = process.env.PASSWORD;

const sequelize = new Sequelize(db, user, password, databaseConfig, {
    define: {
        hooks: {
            beforeUpdate(user) {
                user.account_updated = DataTypes.NOW();
            }
        }
    }
});

export default sequelize;