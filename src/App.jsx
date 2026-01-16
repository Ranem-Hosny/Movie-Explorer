import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import { Box } from "@mui/material";
import Home from "./pages/Home";

function App() {
  return (
    <Box
      sx={{
        bgcolor: "#19222f",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    
    </Box>
  );
}

export default App;
