import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const API_URL = "https://6969ae533a2b2151f845f5f6.mockapi.io/items/items";

//get
export async function getMovies() {
  try {
    const response = await axios.get(API_URL);
    return response.data || [];
  } catch (err) {
    console.log(err);
  }
}

//Add
export async function addMovie(movie) {
  const { id, name, description, image, rating, genres, inTheaters } = movie;

  try {
    const response = await axios.post(API_URL, {
      id: id || uuidv4(),
      name,
      description,
      image,
      rating,
      genres,
      inTheaters,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//delete
export async function deleteMovie(movieId) {
  try {
    const response = await axios.delete(`${API_URL}/${movieId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//update
export async function updateMovie(movieId, updatedMovie) {
  try {
    const response = await axios.put(`${API_URL}/${movieId}`, updatedMovie);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
