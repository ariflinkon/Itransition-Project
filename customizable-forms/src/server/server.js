const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sync DB
db.sequelize.sync({ alter: true })  // Use alter in non-prod environments to avoid data loss

// Starting server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
