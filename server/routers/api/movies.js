const express = require("express");
const router = express.Router();
const movies = require("../../Movies");
const uuid = require("uuid");

movies.connectToDatabase();

//get all movie
router.get("/", async (req, res) => {
  const allMovies = await movies.displayAllMovies();
  res.json(allMovies);
});

//get movie via id
router.get("/:id", async (req, res) => {
  const found = await movies.displayMovieById(req.params.id);
  if (found) {
    res.json(found);
  } else {
    res.status(400).json({ msg: `movie ${req.params.id} not found` });
  }
});

//get movie via genre
router.get("/genre/:genre", async (req, res) => {
  const found = await movies.displayMoviesByGenre(req.params.genre);

  if (found) {
    res.json(found);
  } else {
    res.status(400).json({ msg: `genre ${req.params.genre} not found` });
  }
});

//Add new movie
router.post("/", async (req, res) => {
  const newMovie = {
    id: uuid.v4(),
    name: req.body.name,
    genre: req.body.genre,
    director: req.body.director,
    year: req.body.year,
    img: req.body.img,
  };

  if (!newMovie.name || !newMovie.genre || !newMovie.director) {
    return res.status(400).json({ msg: `Please send name and genre` });
  } else {
    try {
      const addedMovie = await movies.insertOneMovie(newMovie);
      res.json(addedMovie);
    } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

// Delete movie by ID
router.delete("/:id", async (req, res) => {
  const deletedMovie = await movies.deleteMovieById(req.params.id);

  if (deletedMovie) {
    res.json({ msg: "Movie deleted successfully", deletedMovie });
  } else {
    res.status(400).json({
      msg: `Movie ${req.params.id} not found or could not be deleted`,
    });
  }
});

// Delete movie by name
router.delete("/name/:name", async (req, res) => {
  const deletedMovie = await movies.deleteMovieByName(req.params.name);

  if (deletedMovie) {
    res.json({ msg: "Movie deleted successfully", deletedMovie });
  } else {
    res.status(400).json({
      msg: `Movie "${req.params.name}" not found or could not be deleted`,
    });
  }
});

router.put("/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedMovieData = req.body; // Assuming the updated data is sent in the request body

  try {
    const updatedMovie = await movies.updateMovie(movieId, updatedMovieData);
    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.status(404).json({ msg: `Movie with ID ${movieId} not found` });
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
