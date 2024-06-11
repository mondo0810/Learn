require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
});

sequelize.authenticate()
    .then(() => console.log('Connected to MSSQL'))
    .catch(err => console.error('Unable to connect to MSSQL:', err));

module.exports = sequelize;
