const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://arjit:arjit1206@cluster0.iret1e1.mongodb.net/movies";

// const connectionParams = {
//   useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // useCreateIndex: true,
// };

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection success");
  } catch (e) {
    console.error("Error", e);
  }
};

const movieSchema = new mongoose.Schema({
  name: String,
  genre: String,
  director: String,
  year: Number,
  rating: Number,
  img: String,
});

const movies = [
  { id: 1, name: "Pirate", genre: "thriller", Director: "william" },
  { id: 2, name: "movie 3", genre: "romcom", Director: "john" },
];

const Movie = mongoose.model("Movie", movieSchema);

const insertMovie = async () => {
  try {
    // connectToDatabase();
    const res = await Movie.insertMany(movies);
    console.log("Movies inserted:", res);
  } catch (e) {
    console.log(`error ${e}`);
  } finally {
    // mongoose.disconnect();
    // console.log(`Mongo Disconnected`);
  }
};

const displayAllMovies = async () => {
  try {
    // connectToDatabase();
    const allMovies = await Movie.find({});
    console.log("All Movies:", allMovies);
    return allMovies; // Return the movies array if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const displayMovieById = async (movieId) => {
  try {
    // connectToDatabase();
    // Retrieve the movie document by ID from the "movies" collection
    const movie = await Movie.findById(movieId);

    if (!movie) {
      console.log(`No movie found with ID: ${movieId}`);
      return null;
    }

    console.log("Movie by ID:", movie);
    return movie; // Return the movie object if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const displayMoviesByGenre = async (genre) => {
  try {
    // connectToDatabase();
    // Retrieve all movie documents with the specified genre from the "movies" collection
    const moviesByGenre = await Movie.find({ genre });

    if (moviesByGenre.length === 0) {
      console.log(`No movies found with genre: ${genre}`);
      return null;
    }

    console.log(`Movies by Genre (${genre}):`, moviesByGenre);
    return moviesByGenre; // Return the movies array if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const deleteMovieById = async (movieId) => {
  try {
    // connectToDatabase();
    // Delete the movie document by ID from the "movies" collection
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      console.log(`No movie found with ID: ${movieId}`);
      return null;
    }

    console.log("Deleted Movie:", deletedMovie);
    return deletedMovie; // Return the deleted movie object if you want to use it elsewhere
  } catch (error) {
    console.error("Error deleting movie by ID:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const deleteMovieByName = async (movieName) => {
  try {
    // connectToDatabase();
    // Delete the movie document by name from the "movies" collection
    const deletedMovie = await Movie.deleteOne({ name: movieName });

    if (!deletedMovie) {
      console.log(`No movie found with name: ${movieName}`);
      return null;
    }

    console.log("Deleted Movie by Name:", deletedMovie);
    return deletedMovie; // Return the deleted movie object if you want to use it elsewhere
  } catch (error) {
    console.error("Error deleting movie by name:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const insertOneMovie = async (newMovie) => {
  try {
    // connectToDatabase();
    // Create a new movie instance based on the provided details
    const movieInstance = new Movie(newMovie);

    // Save the movie to the database
    const savedMovie = await movieInstance.save();

    console.log("Added Movie:", savedMovie);
    return savedMovie;
  } catch (error) {
    console.error("Error adding movie:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

const updateMovie = async (movieId, updatedMovieData) => {
  try {
    // connectToDatabase();
    // Find the movie by ID and update its data
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      {
        new: true, // Return the modified document
      }
    );

    if (!updatedMovie) {
      console.log(`No movie found with ID: ${movieId}`);
      return null;
    }

    console.log("Updated Movie:", updatedMovie);
    return updatedMovie; // Return the updated movie object if you want to use it elsewhere
  } catch (error) {
    console.error("Error updating movie:", error);
  } finally {
    // mongoose.disconnect();
    // console.log("Mongo Disconnected");
  }
};

module.exports = {
  connectToDatabase,
  insertMovie,
  displayAllMovies,
  displayMovieById,
  displayMoviesByGenre,
  deleteMovieById,
  insertOneMovie,
  deleteMovieByName,
  updateMovie,
};
