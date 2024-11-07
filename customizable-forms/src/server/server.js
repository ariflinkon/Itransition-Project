// src/server.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");
const salesforceRoutes = require('./routes/salesforceRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/api/salesforce", salesforceRoutes);

db.sequelize.sync().then(() => {
  console.log("Database connected and synced.");
}).catch((err) => {
  console.error("Failed to sync database: ", err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
