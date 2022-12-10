const Query = require("../model/Query");
const Movie = require("../model/Movie");
const { Client } = require('pg');
const pgClient = require("../config/dbConn");


const postQuery = async (req, res) => {
    let query = req.body;
    console.log(query)
    saveQuery(query);
    switch (req.body.database) {
        case "postgres":
            
            console.log("Postgres Search Terms: ", query);

            const pgResult = await pgClient.connect().then(()=>{ pgQuery(query).then((results) => {
                console.log(results)
                res.json(results)
            });
        });

            break;
        case "mongo":
            console.log("MongoDB Search Terms: ", query);
            const mongoResult = await mongoQuery(query).then((results) => {
                res.json(results)
            });
            break;
    }

};

const saveQuery = async ({searchTerms, database})=> {
    await Query.create({
    searchTerms: searchTerms,
    database: database,
    })
}

const mongoQuery = async({searchTerms, review}) => {
    try{
        
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
    try {
        let result = await pgClient.query(
            `SELECT * FROM movies WHERE title ILIKE '%${query.searchTerms}%' OR genre ILIKE '%${query.searchTerms}%' OR genre = ANY('{${query.searchTerms.split("|")}}') AND review = '${query.review}'`
        );
        console.log(result)
        return result.rows;
    } catch (err) {
        console.log(err);
    }
};
        


module.exports = { postQuery };