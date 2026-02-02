require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const MovieSchema = require("../model/movie.model");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const testOpenAI = async () => {
//   const response = await client.responses.create({
//     model: "gpt-5-nano",
//     input: "Write a one-sentence bedtime story about a unicorn.",
//   });

//   console.log(response.output_text);
// };
// testOpenAI();

const movieReccomendationAI = async (req, res) => {
  const { id } = req.user;
  try {
    const userMovies = await MovieSchema.find({ user: id });
    if (userMovies.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User has no movies added yet",
      });
    }
    const highRatedWatchedMovies = userMovies.filter(
      (movie) => movie.movieStatus === "Completed" && movie.rating >= 4,
    );

    if (highRatedWatchedMovies.length === 0) {
      return res.status(StatusCodes.OK).json({
        message: "User has no highRated movies added yet",
      });
    }
    const response = await client.responses.create({
      model: "gpt-5",
      instructions: "You are a movie recommedation expert.",
      input: `Based on the user favourite movie (highly Rated):-${highRatedWatchedMovies.map((movie) => `${movie.title} ${movie.year} ${movie.rating}`).join("\n")} but give me in Json format only cause I will use to show in my UI of website`,
    });

    const recommedations = JSON.parse(response.output_text);
    res.status(StatusCodes.OK).json({
      message: "This are your recommended movies",
      recommendedMovies: recommedations,
    });
  } catch (error) {
    console.log("MovieAIRecommendaiton error: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = { movieReccomendationAI };
