import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useMovies } from "../contexts/MoviesProvider";

export default function ConfirmDelete({ open, close, movie }) {
  const { handleDeleteMovie } = useMovies();
  return (
    <Dialog open={open} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        Do You Want Delete This Movie ?{" "}
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={close}>
          Disagree
        </Button>
        <Button
          autoFocus
          onClick={() => {
            handleDeleteMovie(movie.id);
            close();
          }}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
