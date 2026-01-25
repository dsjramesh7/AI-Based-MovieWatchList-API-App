// test implementation
/*
const { movies } = require("../data/data");
//JSON Response
// const getAllMovies = (req, res) => {
//   res.json({
//     success: true,
//     message: "Fetched All Movies Succesfully!!!",
//     data: movies,
//     totalLengthOfMovies: movies.length,
//   });
// };

//Json response with status code
const getAllMoviesStatusCode = (req, res) => {
  res.status(201).json({
    success: true,
    data: movies,
    totalLengthOfMovies: movies.length,
  });
};

// post movie thing
const postMovie = (req, res) => {
  const data = req.body;
  if (!data.title || !data.year) {
    return res.status(400).json({
      error: true,
      message: "Title and Year is required",
    });
  }

  movies.push(data);
  res.status(201).json({
    success: true,
    message: `${data.title} movie is added successfully`,
  });
};

// blockthe url
const blocked = (req, res) => {
  res.json({
    success: true,
    message: "You will never see this",
  });
};

// route paramter/request paramter with one ID
const getByIdMovie = (req, res) => {
  console.log("Route Parameter: ", req.params);
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({
      error: true,
      message: `Movie with id: ${id} is not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: movie,
    message: `Movie Fetched Successfully`,
  });
};

// route parameter/request parameter with many Id
const getByIdBothUserandMovie = (req, res) => {
  console.log("Route Parameters: ", req.params);
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const user = users.find((user) => user.id === userId);
  const movie = movies.find((movie) => movie.id === movieId);
  if (!user || !movie) {
    return res.status(404).json({
      error: true,
      message: `Movie or user is not found`,
    });
  }
  res.status(200).json({
    success: true,
    data: {
      user: user,
      movie: movie,
    },
    message: `Movie Fetched Successfully`,
  });
};

// query string
const getByQueryStringMethodMovie = (req, res) => {
  const query = req.query;
  console.log("Query String: ", query);
  const title = query.title;

  const movie = movies.find(
    (movie) => movie.title.toLowerCase() === title.toLowerCase(),
  );
  if (!movie) {
    return res.status(404).json({
      error: true,
      message: `Movie not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: movie,
    message: `Movie Fetched Successfully`,
  });
};

// Patch Method
const updateCertainThingMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie?.id === id);
  const data = req.body;
  if (!data?.title) {
    res.status(400).json({
      error: true,
      message: "Movie Title is required",
    });
  }
  console.log("Data: ", data);
  if (!movie) {
    res.status(404).json({
      error: true,
      message: "Movie Not Found",
    });
  }
  movie.title = data.title;
  res.status(200).json({
    success: true,
    message: "Title Updated Successfully",
    data: movie,
  });
};

// Delete Method
const deleteMovie = (req, res) => {
  const data = req.body;
  const { title } = data;
  if (!title) {
    res.status(400).json({
      error: true,
      message: "Title is does not exist",
    });
  }
  const movie = movies.find(
    (movie) => movie?.title.toLowerCase() === title.toLowerCase(),
  );
  if (!movie) {
    res.status(404).json({
      error: true,
      message: "Movie Not Found",
    });
  }
  const updateMovies = movies.filter(
    (movie) => movie?.title.toLowerCase() !== title.toLowerCase(),
  );
  res.status(200).json({
    success: true,
    message: "Movie Deleted Successfully",
    movies: updateMovies,
  });
};

module.exports = {
  getAllMoviesStatusCode,
  postMovie,
  blocked,
  getByIdMovie,
  getByIdBothUserandMovie,
  getByQueryStringMethodMovie,
  updateCertainThingMovie,
  deleteMovie,
};
*/

//Real Implementation
const MovieModel = require("../model/movie.model.js");
const { StatusCodes } = require("http-status-codes");

const createMovie = async (req, res) => {
  try {
    const data = req.body;
    console.log("DataOfMovie: ", data);
    if (!data.title || !data.year) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Title and Year both are required!!!",
      });
    }
    const newMovie = await MovieModel.create(data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Movie created successfully",
      data: newMovie,
    });
  } catch (error) {
    console.log("Error: ", error?.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error?.message,
    });
  }
};

const getMovieByID = async (req, res) => {
  const id = req.params.id;
  console.log("movieId", id);
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: `Movie with this ${id} is not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Movie Found Successfully",
      data: movie,
    });
  } catch (error) {
    console.log("Error: ", error?.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error?.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    if (allMovies.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No Movies has been created yet",
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "All Movies Found Successfully",
      allMovies: allMovies,
    });
  } catch (error) {
    console.log("allMoviesError: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: `Movie with this ${id} id doesn't exist`,
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Movie Deleted Successfully",
      data: movie,
    });
  } catch (error) {
    console.log("deleteMovieIssue: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  const id = req.params.id;
  const movieUpdatedata = req.body;
  if (!movieUpdatedata) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Data is required",
    });
  }
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: `Movie with this ${id} id doesn't exist`,
      });
    }
    movie.title = movieUpdatedata.title;
    await movie.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Movie Updated Successfully",
      data: movieUpdatedata,
    });
  } catch (error) {
    console.log("updateIssue: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getMovieByID,
  getAllMovies,
  deleteMovie,
  updateMovie,
};
