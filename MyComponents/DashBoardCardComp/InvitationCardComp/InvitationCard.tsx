// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Rating,
  TextField,
} from "@mui/material";
//
import GirlOnChairIllustration from "../../../assets/illustration_girl_on_chair";
import StarFull from "../../../assets/icon_starFull";
import StarDisable from "../../../assets/icon_starDisable";
import { translateRect } from "@fullcalendar/common";
import StarFullNew from "../../../assets/Icon_starFullNew";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  width: "92%",
  boxShadow: "none",
  marginLeft: "auto",
  textAlign: "center",
  background: "linear-gradient(135deg, #FFA48D 0%, #B72136 100%)",
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    // color: "#fff",
    padding: "2px",
  },
  //   "& .MuiRating-iconHover": {
  //     color: "#000",
  //   },
});

// ----------------------------------------------------------------------

export default function InvitationCard() {
  return (
    <Box
      sx={{
        position: "relative",
        paddingTop: { md: 0, sm: "100px", xs: "100px" },
      }}
    >
      <GirlOnChairIllustration
        sx={{
          position: "absolute",
          zIndex: 100,
          top: { lg: 0, md: 0, sm: "0%", xs: "0%" },
          left: { lg: 0, md: 0 },
          //   transform: "translateX(50%)",
          textAlign: "center",
          p: 3,
          width: { md: "140px", xs: "100%" },
          height: "202px",
        }}
      />
      <RootStyle>
        <CardContent
          sx={{
            // color: "grey.800",
            // p: { md: 0 },
            pl: { md: 12 },
            pt: { xs: 16, sm: 16, md: 0 },
          }}
        >
          <Typography
            variant="h5"
            fontFamily={"Public Sans"}
            // fontWeight={700}
            color="#fff"
            sx={{ pb: { xs: 2, xl: 4 }, maxWidth: 480, mx: "auto" }}
          >
            {"Akash, you did really well!!"}
          </Typography>

          <Typography
            variant="subtitle1"
            fontFamily={"Public Sans"}
            fontWeight={400}
            color="#fff"
            lineHeight={0.5}
          >
            {"Level 1, lesson 5"}
          </Typography>

          <Typography
            variant="h4"
            fontFamily={"Public Sans"}
            // fontWeight={700}
            color="#fff"
            sx={{ pb: { xs: 2, xl: 4 }, maxWidth: 480, mx: "auto" }}
          >
            {"Bunny & Carrot"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontFamily={"Public Sans"}
              //   fontWeight={600}
              color="#fff"
              sx={{ marginRight: "10px" }}
            >
              {`Coins earned`}
            </Typography>
            <StyledRating
              name="read-only"
              value={5}
              icon={<StarFullNew width={24} height={24} />}
              emptyIcon={<StarDisable />}
              readOnly
            />
          </Box>
        </CardContent>
        <CardContent
          sx={{
            // color: "grey.800",
            // p: { md: 0 },
            pl: { md: 8 },
          }}
        >
          <Typography
            variant="subtitle1"
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#fff"
            sx={{
              pb: { xs: 2, xl: 4 },
              maxWidth: 230,
              mx: { md: 0, xs: "auto" },
            }}
            // maxWidth="15rem"
          >
            {
              "Invite your friends to take this lesson and earn coins in return!"
            }
          </Typography>

          <Typography
            variant="h4"
            fontFamily={"Public Sans"}
            // fontWeight={700}
            color="#fff"
            sx={{
              pb: { xs: 2, xl: 4 },
              maxWidth: 230,
              mx: { md: 0, xs: "auto" },
            }}
          >
            {"Earn 5 coins"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: { sm: 230 },
              mx: "auto",
            }}
          >
            <TextField
              label="Email"
              size="small"
              sx={{
                background: " rgba(0, 0, 0, 0.16)",
                borderRadius: "10px",
                marginRight: "0.5rem",
                maxWidth: "230px",
              }}
            />

            <Button
              variant="contained"
              color={"warning"}
              sx={{
                paddingY: "7px",
              }}
            >
              Invite
            </Button>
          </Box>
        </CardContent>
      </RootStyle>
    </Box>
  );
}
