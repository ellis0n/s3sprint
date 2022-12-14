// This controller is responsible for handling all the requests related to queries. It is responsible for saving the query to the database and then returning the results of the query to the client.

const Query = require("../model/Query"); // Import the Query model
const Movie = require("../model/Movie"); // Import the Movie model
const { pgClient } = require("../config/dbConn"); // Import the Postgres client

// This function is called when the client sends a POST request to the /api/query endpoint. It takes the search terms and database from the request body and then calls the appropriate function to query the database. It then returns the results to the client.

const postQuery = async (req, res) => {
  let query = req.body;
  // Save the query to the database (MongoDB)
  saveQuery(query);
  // Query the database based on the database selected by the user
  // The functions being called are defined below
  switch (req.body.database) {
    case "postgres":
      console.log("Postgres Search Terms: ", query);
      pgQuery(query).then((results) => {
        res.json(results);
      });
      break;
    case "mongo":
      console.log("MongoDB Search Terms: ", query);
      mongoQuery(query).then((results) => {
        res.json(results);
      });
      break;
    case "searchall":
      let resultArray = [];
      console.log("MongoDB and PostgresSearch Terms: ", query);
      try {
        await mongoQuery(query).then((results) => {
          console.log(results);
          resultArray = resultArray.concat(results);
        });
        await pgQuery(query).then((results) => {
          resultArray = resultArray.concat(results);
        });
        console.log(resultArray);
      } catch (err) {
        console.log(err);
      }
      res.json(resultArray);
  }
};

// Store each query in the mongoDB database
const saveQuery = async ({ searchTerms, database, user, date }) => {
  try {
    await Query.create({
      searchTerms: searchTerms,
      database: database,
      user: user,
      date: date,
    });
  } catch (err) {
    console.log(err);
  }
};

// Handle Mongo queries
const mongoQuery = async ({ searchTerms, review }) => {
  try {
    let result = await Movie.find({
      // Simple regex to search for the search terms in the title or genre fields
      $or: [
        { title: { $regex: searchTerms, $options: "i" } },
        { genre: { $regex: searchTerms, $options: "i" } },
        { genre: { $in: searchTerms.split("|") } },
      ],
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

// Handle PG queries
const pgQuery = async (query) => {
  try {
    let result = await pgClient.query(
      `SELECT * FROM movies WHERE title ILIKE '%${
        query.searchTerms
      }%' OR genre ILIKE '%${
        query.searchTerms
      }%' OR genre = ANY('{${query.searchTerms.split("|")}}')`
    );
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postQuery };
