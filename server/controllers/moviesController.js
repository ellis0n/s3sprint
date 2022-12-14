// This file is responsible for handling all the requests related to movies
const Movie = require("../model/Movie"); // Import the Movie model
const { pgClient } = require("../config/dbConn"); // Import the Postgres client

// This function returns the total number of movies in both databases.
const getMovies = async (req, res) => {
  try {
    let mongoCount = await Movie.countDocuments();
    let pgQuery = await pgClient.query("SELECT COUNT(*) FROM movies");
    pgCount = parseInt(pgQuery.rows[0].count);
    let count = mongoCount + pgCount;
    res.send({ total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// Possible future functionality could include a function to add, edit or delete a movie from the database but these are not currently implemented.

module.exports = { getMovies };
