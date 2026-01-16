import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../services/movieService";
import { toast } from "react-toastify";
const MovieContext = createContext();

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState("Add");
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  const handleAddMovie = async (values) => {
    const newMovie = await addMovie(values);
    setMovies((prev) => [...prev, newMovie]);
    toast.success("Movie added");
  };

  const handleUpdateMovie = async (movieId, values) => {
    const updatedMovie = await updateMovie(movieId, values);

    setMovies((prev) =>
      prev.map((movie) => (movie.id === movieId ? updatedMovie : movie))
    );

    toast.success("Movie updated");
  };

  const handleDeleteMovie = async (movieId) => {
    await deleteMovie(movieId);
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    toast.success("Movie deleted");
  };

  const handleRatingChange = async (movieId, rating) => {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === movieId ? { ...movie, rating } : movie))
    );

    try {
      await updateMovie(movieId, { rating });
      toast.success("Rating updated");
    } catch {
      toast.error("Failed to update rating");
    }
  };

  const handleRemoveRating = () => {
    const removedRate = movies.map((movie) => ({
      ...movie,
      rating: 0,
    }));

    setMovies(removedRate);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        showForm,
        setShowForm,
        mood,
        setMood,
        updatedMovie,
        setUpdatedMovie,
        movieId,
        setMovieId,
        handleAddMovie,
        handleDeleteMovie,
        handleRatingChange,
        handleRemoveRating,
        handleUpdateMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
export const useMovies = () => useContext(MovieContext);
