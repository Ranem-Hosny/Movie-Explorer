import MovieCard from "./MovieCard";
import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import { useMovies } from "../contexts/MoviesProvider";
import { lazy, Suspense } from "react";

export default function MovieList() {
  const FormModal = lazy(() => import("../Modals/FormModal"));
  const { movies, showForm } = useMovies();

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            height="100%"
          >
            <CircularProgress />
          </Box>
        }
      >
        <FormModal open={showForm} />
      </Suspense>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "30px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {movies && movies.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "flex-start",
              maxWidth: "1200px",
              width: "95%",
            }}
          >
            {movies?.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  flex: "1 1 clamp(250px, 33%, 300px)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        ) : (
          <Alert variant="filled" severity="info">
            No movies to watch - Add your favorite one!
          </Alert>
        )}
      </Box>
    </>
  );
}
