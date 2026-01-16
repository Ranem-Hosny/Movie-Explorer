import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../services/movieService";
import { toast } from "react-toastify";
import axios from "axios";
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

  const handleRemoveRating = async () => {
    try {
      const removedRate = movies.map((movie) => ({
        ...movie,
        rating: 0,
      }));

      setMovies(removedRate);

      const updateRequests = movies.map((movie) =>
        axios.put(
          `https://6969ae533a2b2151f845f5f6.mockapi.io/items/items/${movie.id}`,
          { ...movie, rating: 0 }
        )
      );
      await Promise.all(updateRequests);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterMovieByInTheaters = () => {
    const filterMovies = movies.filter((movie) => movie.inTheaters === true);
    console.log(filterMovies);

    setMovies(filterMovies);
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
        handleFilterMovieByInTheaters,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
export const useMovies = () => useContext(MovieContext);
