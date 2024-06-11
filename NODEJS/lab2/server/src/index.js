const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module
const sequelize = require('./db');
const mainRouter = require('./routes/mainRouter');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Synchronize models with the database
sequelize.sync();

// Use main router
app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
