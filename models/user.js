import { DataTypes } from 'sequelize';
import sequelize from '../db-connection.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: ()=>uuidv4(),
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    account_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        unique: false,
    },
    account_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
        unique: false,
    }
}, {
    timestamps: false, // Disable createdAt and updatedAt
    indexes: [
        { unique: true, fields: ['username'] } // This adds a unique constraint to the database table
    ]
});

export default User;
