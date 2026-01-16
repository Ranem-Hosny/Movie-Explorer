import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import MovieForm from "../components/MovieForm";
import { useMovies } from "../contexts/MoviesProvider";

export default function FormModal({ open }) {
  const { setShowForm } = useMovies();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#19222f",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box>
      <Modal
        open={open}
        onClose={() => {
          setShowForm(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MovieForm />
        </Box>
      </Modal>
    </Box>
  );
}
