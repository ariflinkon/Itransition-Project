require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 5,           // Maximum number of connection in pool
        min: 0,           // Minimum number of connection in pool
        acquire: 30000,   // Maximum time in ms that pool will try to get connection before throwing error
        idle: 10000       // Maximum time in ms that a connection can be idle before being released
    }
};