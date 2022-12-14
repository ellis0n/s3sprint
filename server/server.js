// Description: This is the main server file. It is the entry point for the application.
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

//Set Port to 3500
const PORT = process.env.PORT || 3500;

//Middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

//Database
const mongoose = require("mongoose");
const { connectDB, connectPG } = require("./config/dbConn");

// CORS
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Connect to database
connectDB();
connectPG();

// Log every route request
app.use(logger);
// CORS
app.use(cors(corsOptions));

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// SERVE STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes:
app.use("/", require("./routes/root"));
app.use("/query", require("./routes/api/query"));
app.use("/movies", require("./routes/api/movies"));
app.use("/login", require("./routes/api/users"));
app.use("/register", require("./routes/api/users"));

// 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handler
app.use(errorHandler);

// Open connection to Mongo, the main DB employed by this application
mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
