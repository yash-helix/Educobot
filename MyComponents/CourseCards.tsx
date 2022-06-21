// @mui
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Divider,
  Typography,
  Container,
  Grid,
  Chip,
  Rating,
} from "@mui/material";
import Image from "../components/Image";
import { dashboardCardData } from "../staticData";
import StarFull from "../assets/icon_starFull";
import StarHalf from "../assets/icon_starHalf";
import StarDisable from "../assets/icon_starDisable";
import IconLock from "../assets/icon_Lock";
import shadows from "../theme/shadows";
import pellete from "../theme/palette";
import Iconify from "../components/Iconify";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 0),
  },
}));

const CourseCards = () => {
  return (
    <div>
      <RootStyle>
        <Container>
          <Stack rowGap={4} direction="column">
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="body1" component="h1" fontWeight={600}>
                You are in level 1 that has {dashboardCardData.length} lessons
              </Typography>
              <Link href="#" target="">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    display: "inline-flex",
                    color: pellete.light.grey[900],
                  }}
                  spacing={1}
                >
                  <Typography variant="body2">
                    View all levels and lessons
                  </Typography>
                  <Iconify
                    icon={"ic:sharp-greater-than"}
                    width={20}
                    height={20}
                  />
                </Stack>
              </Link>
            </Stack>
          </Stack>

          <Grid container spacing={4} mt={0}>
            {dashboardCardData.map((card, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                  <CardComp data={card} index={index + 1} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </RootStyle>
    </div>
  );
};

export default CourseCards;

type CardProps = {
  data: {
    title: string;
    tags: string[];
    desc: string;
    ratings?: number | undefined;
    status: string;
    img: string;
  };
  index: number;
};

export const CardComp = ({ data, index }: CardProps) => {
  type StarProps = {
    full: number;
    half: number;
    disabled: number;
  };
  const starsCoin: StarProps = {
    full: 0,
    half: 1,
    disabled: 0,
  };

  // if float
  if (data.ratings && Number.isInteger(data.ratings) === false) {
    let round = Math.round(data.ratings);
    starsCoin.full = round - 1;
    starsCoin.disabled = 5 - round;
  }
  // if integer
  else if (data.ratings && Number.isInteger(data.ratings)) {
    starsCoin.full = data.ratings;
    starsCoin.disabled = 5 - starsCoin.full;
    starsCoin.half = 0;
  }
  // if zero ratings
  else if (data.ratings == 0) {
    starsCoin.disabled = 5;
    starsCoin.half = 0;
  }

  return (
    <Card
      sx={{
        py: 2,
        px: 1,
        boxShadow: shadows.light[3],
        ...(data.status === "start" && {
          background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)",
        }),
        ...(data.status === "locked" && {
          background: pellete.light.grey[200],
        }),
      }}
    >
      {/* title & index */}
      <Stack spacing={1.5} padding={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: pellete.light.grey[100],
              background: pellete.light.grey[800],
              borderRadius: "100%",
              padding: "0px 8px",
              border: "1.1px solid #F9FAFB",
            }}
          >
            {index}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: ".8rem",
              fontWeight: 600,
              ...(data.status === "start" && {
                color: pellete.light.grey[100],
                fontWeight: 500,
              }),
            }}
          >
            {data.title}
          </Typography>
        </Stack>

        {/* tags */}
        <Grid container gap={1}>
          {data.tags.map((tag, i) => (
            <Grid item key={i}>
              <Typography
                sx={{
                  fontSize: 10,
                  paddingX: 0.6,
                  paddingY: 0.2,
                  borderRadius: 0.8,
                  color: pellete.light.grey[600],
                  background: pellete.light.grey[200],
                  ...(data.status === "start" && {
                    background: pellete.light.grey[300],
                    color: pellete.light.grey[800],
                  }),
                }}
              >
                {tag}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Image alt="image" src={data.img} width="100" borderRadius={1} />

      <Stack gap={1} padding={1}>
        {/* description */}
        <Typography
          sx={{
            color: pellete.light.grey[500],
            ...(data.status === "start" && { color: pellete.light.grey[100] }),
          }}
        >
          {data.desc}
        </Typography>

        {/* ratings */}
        {data.ratings !== undefined && data.status !== "locked" && (
          <Stack direction="row" alignItems="center" justifyContent="center">
            {new Array(starsCoin.full).fill(1).map((item, index) => {
              return <StarFull key={index} />;
            })}
            {new Array(starsCoin.half).fill(1.5).map((item, index) => {
              return <StarHalf key={index} />;
            })}
            {new Array(starsCoin.disabled).fill(10).map((item, index) => {
              return <StarDisable key={index} />;
            })}
          </Stack>
        )}

        {/* buttons */}
        {data.status === "done" ? (
          <Button variant="outlined" color="inherit">
            Revise
          </Button>
        ) : data.status === "start" ? (
          <Button variant="contained" color="error">
            Start Lesson
          </Button>
        ) : (
          <Button variant="contained" color="inherit" disabled>
            <IconLock />
          </Button>
        )}
      </Stack>
    </Card>
  );
};
