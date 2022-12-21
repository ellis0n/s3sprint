const {mongoQuery} = require('../controllers/queryController.js');
const mongoose = require("mongoose");
require("dotenv").config();

describe("Testing mongoQuery function", () => {
    // Connect to the database before running any tests.
    beforeAll(async () => {
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
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });

    test('Testing mongoQuery', async() => {

    const queryTerms = {
        searchTerms: "MC5"
    }
    
    let query = await mongoQuery(queryTerms)
    expect(query).toEqual(expect.arrayContaining([
        expect.objectContaining({
            title: "MC5: Kick Out the Jams"
        })
    ]))
    })
})