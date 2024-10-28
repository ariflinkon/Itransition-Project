require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Database connection
db.sequelize.sync().then(() => {
  console.log("Database connected and synced.");
}).catch((err) => {
  console.error("Failed to sync database: ", err);
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
