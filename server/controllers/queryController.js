const Query = require("../model/Query");
const Movie = require("../model/Movie");
const { Client } = require("pg");

const postQuery = async (req, res) => {
  let query = req.body;
  console.log(query);
  saveQuery(query);
  switch (req.body.database) {
    case "postgres":
      console.log("Postgres Search Terms: ", query);
      pgQuery(query).then((results) => {
        res.json(results);
      });
      break;
    case "mongo":
      console.log("MongoDB Search Terms: ", query);
      const mongoResult = await mongoQuery(query).then((results) => {
        res.json(results);
      });
      break;
    case "searchall":
      let resultArray = [];
      console.log("MongoDB and PostgresSearch Terms: ", query);
      const bothResult1 = await mongoQuery(query).then((results) => {
        console.log(results);
        resultArray = resultArray.concat(results);
      });
      const bothResult2 = await pgQuery(query).then((results) => {
        resultArray = resultArray.concat(results);
      });
      console.log(resultArray);
      res.json(resultArray);
  }
};

const saveQuery = async ({ searchTerms, database, user, date }) => {
  await Query.create({
    searchTerms: searchTerms,
    database: database,
    user: user,
    date: date,
  });
};

const mongoQuery = async ({ searchTerms, review }) => {
  try {
    let result = await Movie.find({
      $or: [
        { title: { $regex: searchTerms, $options: "i" } },
        { genre: { $regex: searchTerms, $options: "i" } },
        { genre: { $in: searchTerms.split("|") } },
      ],
      review: { $eq: review },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

const pgQuery = async (query) => {
  const pgClient = new Client({
    user: "postgres",
    host: "127.0.0.1.",
    database: "sprint2",
    password: process.env.POSTGRES_PW,
    port: 5432,
  });
  pgClient.connect();
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
