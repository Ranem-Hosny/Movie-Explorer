import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MoviesProvider from "./contexts/MoviesProvider.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </StrictMode>
  </BrowserRouter>
);
