const Movie = require("../model/Movie");

const getMovies = async (req, res) => {
  try {
    let count = await Movie.countDocuments();
    count = count.toString();
    res.send({total: count});
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};




module.exports = { getMovies };