import { Box, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "15px",
        py: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 0.5,
        bgcolor: "#19222f",
        borderTop: "1px solid #ccc",
      }}
    >
      <MovieIcon sx={{ color: "#7670e6", fontSize: 20 }} />
      <Typography variant="body2" color="#fff">
        Movie App
      </Typography>
    </Box>
  );
}
