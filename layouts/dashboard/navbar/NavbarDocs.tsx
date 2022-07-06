// @mui
import { Stack, Button, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// routes
import { PATH_DOCS } from "../../../routes/paths";
// assets
import { DocIllustration } from "../../../assets";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const router = useRouter();
  const { user } = useAuth();
  // const user = { displayName: "ramila" }
  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        textAlign: "center",
        display: "block",
      }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Need help?
        </Typography>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          router.push(`/dashboard/contact-us/`);
        }}
      >
        Contact us
      </Button>
    </Stack>
  );
}
