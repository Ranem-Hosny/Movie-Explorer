import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//get
export async function getMovies() {
  try {
    const response = await axios.get("http://localhost:3000/items");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//Add
export async function addMovie(movie) {
  const { id, name, description, image, rating, genres, inTheaters } = movie;
  
  try {
    const response = await axios.post("http://localhost:3000/items", {
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
    const response = await axios.delete(
      `http://localhost:3000/items/${movieId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//update
export async function updateMovie(movieId, updatedMovie) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/items/${movieId}`,
      updatedMovie
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
