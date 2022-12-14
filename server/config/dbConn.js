// This file is used to connect to the MongoDB and Postgres databases.

const { Client } = require("pg");

const mongoose = require("mongoose");

const pgClient = new Client({
  user: "postgres",
  host: "127.0.0.1.",
  database: "sprint2",
  password: process.env.POSTGRES_PW,
  port: 5432,
});

const connectPG = async () => {
  try {
    await pgClient.connect().then(() => {
      console.log("Postgres connected.");
    });
  } catch (err) {
    console.error(err);
  }
};

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB connected."));
  } catch (err) {
    console.error(err);
  }
};

module.exports = { connectDB, connectPG, pgClient };
