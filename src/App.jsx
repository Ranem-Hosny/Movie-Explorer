import "./App.css";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        bgcolor: "#19222f",
      }}
    >
      <MovieList />
      <Footer />
    </Box>
  );
}

export default App;
