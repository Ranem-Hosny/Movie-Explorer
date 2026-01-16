import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { lazy, useState } from "react";
import { useMovies } from "../contexts/MoviesProvider";
import { Suspense } from "react";

export default function MovieCard({ movie }) {
  const {
    setUpdatedMovie,
    setShowForm,
    setMovieId,
    setMood,
    handleRatingChange,
  } = useMovies();
  const [showConfirm, setShowConfirm] = useState(false);
  const ConfirmDelete = lazy(() => import("../Modals/ConfirmDelete"));

  return (
    <Card
      sx={{
        width: "100%",
        justifyContent: "center",
        maxWidth: 320,
        margin: "auto",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 6,
        display: "flex",
        flexDirection: "column",
        "&:hover .actions-btns": {
          display: "flex",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          loading="lazy"
          component="img"
          image={movie.image}
          alt={movie.name}
          sx={{
            height: 370,
            objectFit: "fill",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StarIcon
            sx={{ color: movie.rating > 0 ? "#FFD700" : "#ccc", fontSize: 34 }}
          />
          <Typography
            sx={{
              position: "absolute",
              color: "#000",
              fontSize: "0.75rem",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {movie.rating}
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: 140,
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography fontWeight="bold" noWrap color="#000">
            {movie.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, my: 0.5 }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{ backgroundColor: "#7670e6", color: "#fff" }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            color="#000"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mt: 2,
            }}
          >
            {movie.description}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="auto"
        >
          <Box display="flex" alignItems="center" mr={1}>
            <Typography variant="p" color="#000">
              Rating:({movie.rating ? movie.rating : 0}/5)
            </Typography>
            <Rating
              value={movie.rating}
              name={`movie-rating-${movie.id}`}
              onChange={(e, newValue) => {
                handleRatingChange(movie.id, newValue);
                console.log("New rating:", newValue);
              }}
              size="small"
            />
          </Box>
          <Box className="actions-btns" display="none" gap="5px">
            <EditIcon
              onClick={() => {
                setUpdatedMovie(movie);
                setMovieId(movie.id);
                setMood("Update");
                setShowForm(true);
              }}
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "3px",
                color: "#7670e6",
                cursor: "pointer",
                fontSize: 20,
              }}
            />
            <DeleteIcon
              onClick={() => {
                setShowConfirm(true);
              }}
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "3px",
                color: "red",
                cursor: "pointer",
                fontSize: 20,
              }}
            />
          </Box>
        </Box>
      </CardContent>
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        }
      >
        <ConfirmDelete
          movie={movie}
          open={showConfirm}
          close={() => {
            setShowConfirm(false);
          }}
        />
      </Suspense>
    </Card>
  );
}
