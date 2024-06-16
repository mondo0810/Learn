const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '45.76.178.205',
    user: 'nodejsexam',
    password: 'nodejsexam',
    port: '3306',
    database: 'nodejsexam'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = connection;