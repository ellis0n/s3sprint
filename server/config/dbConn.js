const { Client } = require('pg');

const mongoose = require("mongoose");

const connectDB = async () => {

  const pgClient = new Client({
    user: 'postgres',
    host: '127.0.0.1.',
    database: 'sprint2',
    password: process.env.POSTGRES_PW,
    port: 5432,
  });
  
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => console.log("MongoDB connected."));

    pgClient.connect().then(() => console.log("Postgres connected."));

  } catch (err) {
    console.error(err);
  }


};

module.exports = connectDB;
