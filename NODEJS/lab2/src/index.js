require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const mainRouter = require('./routes/mainRouter');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Synchronize models with the database
sequelize.sync();

// Use main router
app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
