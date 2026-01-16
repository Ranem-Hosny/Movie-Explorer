import { Box, Button, Grid, Typography } from "@mui/material";
import { useMovies } from "../contexts/MoviesProvider";

export default function Navbar() {
  
  const { movies, setShowForm, setMood, setUpdatedMovie, handleRemoveRating } =
    useMovies();

  const mapping = movies?.map((movie) => movie.rating || 0);
  const sum = mapping.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  const averageRating = movies.length > 0 ? sum / movies.length : 0;

  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid
          item
          xs={6}
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" color="#fff">
            Total movies: {movies.length}
          </Typography>
          <Typography variant="body1" color="#fff">
            /
          </Typography>

          <Typography variant="body1" color="#fff">
            Average Rating: {averageRating.toFixed(1)}
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => handleRemoveRating()}
            variant="contained"
            sx={{ backgroundColor: "#36b2d1" }}
          >
            Remove Ratings
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#36b2d1" }}
            onClick={() => {
              setShowForm(true);
              setMood("Add");
              setUpdatedMovie(null);
            }}
          >
            Add Movie
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
