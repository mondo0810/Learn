const { Sequelize } = require('sequelize');

require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    operatorsAliases: 0,
    timezone: "Asia/Ho_Chi_Minh"
});

sequelize.authenticate()
    .then(() => console.log('Connected to MSSQL'))
    .catch(err => console.error('Unable to connect to MSSQL:', err));

module.exports = sequelize;
