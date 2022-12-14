// This file contains the schema for the queries that are saved to the database

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
  searchTerms: {
    type: String,
    require: true,
  },
  database: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Query", querySchema);
