import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useMovies } from "../contexts/MoviesProvider";

export default function MovieForm() {
  const {
    handleAddMovie,
    setShowForm,
    mood,
    updatedMovie,
    movieId,
    setUpdatedMovie,
    handleUpdateMovie,
  } = useMovies();
  const validationSchema = Yup.object({
    name: Yup.string().required("Movie Name Is Required"),
    image: Yup.string().required("Movie Image Is Required"),
  });
  const genresoptions = ["Drama", "Crime", "Action", "Comedy"];
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, color: "#fff" }}>
      <Typography id="modal-modal-title" variant="h5" textAlign="center" mb={2}>
        {mood === "Add" ? "Add Movie" : "Update Movie"}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: updatedMovie?.name || "",
          description: updatedMovie?.description || "",
          image: updatedMovie?.image || "",
          genres: updatedMovie?.genres || [],
          inTheaters: updatedMovie?.inTheaters || false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (mood === "Add") {
            handleAddMovie(values);
          } else {
            await handleUpdateMovie(movieId, values);
          }
          setShowForm(false);
          setUpdatedMovie(null);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup sx={{ mb: 2 }}>
              <TextField
                label="name"
                name="name"
                type="text"
                size="small"
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </FormGroup>
            <FormGroup sx={{ mb: 2 }}>
              <TextField
                label="Description"
                name="description"
                multiline
                minRows={3}
                InputProps={{
                  style: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
              />
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("image", file);

                  try {
                    const res = await axios.post(
                      `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
                      formData
                    );
                    setFieldValue("image", res.data.data.url);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                style={{
                  width: "100%",
                  paddingLeft: "5px",
                  paddingBlock: "10px",
                  border: "1px solid #7670e6",
                  borderRadius: 8,
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  transition: "border 0.3s, background-color 0.3s",
                }}
              />

              {touched.image && errors.image && (
                <FormHelperText error>{errors.image}</FormHelperText>
              )}

              {values.image && (
                <Box mt={1} display="flex" alignItems="center" gap={1}>
                  <img
                    src={values.image}
                    alt="Preview"
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <Typography variant="caption" color="green">
                    Image uploaded
                  </Typography>
                </Box>
              )}
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
              <InputLabel
                id="genres-label"
                sx={{
                  color: "#fff",
                }}
              >
                Select genres
              </InputLabel>
              <Select
                label="select genres"
                labelId="genres-label"
                name="genres"
                multiple
                value={values.genres}
                onChange={handleChange}
                onBlur={handleBlur}
                renderValue={(selected) => selected.join(", ")}
                fullWidth
                size="small"
              >
                {genresoptions?.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
              {touched.genres && errors.genres && (
                <FormHelperText error>{errors.genres}</FormHelperText>
              )}
            </FormGroup>

            <FormControlLabel
              control={
                <Checkbox
                  name="inTheaters"
                  checked={values.inTheaters}
                  onChange={handleChange}
                />
              }
              label="In Theaters"
            />

            <Box display="flex" mt={2} justifyContent="space-between">
              <Button
                type="button"
                variant="contained"
                sx={{
                  backgroundColor: "#999",
                }}
                disabled={isSubmitting}
                onClick={() => {
                  handleReset();
                  setShowForm(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {mood === "Add" ? "Add" : "Update"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}
