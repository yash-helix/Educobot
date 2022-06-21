import {
  Stack,
  Box,
  Paper,
  Container,
  Typography,
  PaperProps,
} from "@mui/material";

export default function ShadowCard({ sx, title }: PaperProps) {
  return (
    <Paper
      sx={{
        padding: 3,
        margin: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: {
          xs: "calc((100%/2) - 24px)",
          sm: "calc((100%/4) - 24px)",
          md: "calc((100%/6) - 24px)",
        },
        ...sx,
      }}
    >
      <Typography variant="subtitle2" sx={{ textTransform: "capitalize" }}>
        {title}
      </Typography>
    </Paper>
  );
}
