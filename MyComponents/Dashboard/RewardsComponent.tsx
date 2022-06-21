import { styled, useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { Link, Stack, Typography, Container } from "@mui/material";
import StarFull from "../../assets/icon_starFull";
import IconLock from "../../assets/icon_Lock";
import pellete from "../../theme/palette";
import Iconify from "../../components/Iconify";
import IconBadge from "../../assets/icon_badge";
import IconRotate from "../../assets/icon_rotate";
import StarFUllNew from "../../assets/Icon_starFullNew";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  marginTop: 50,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 0),
  },
}));

const rewards = {
  coins_earned: 302,
  badges_earned: [
    {
      name: "Badge Name",
      icon: (
        <IconLock
          width={120}
          height={120}
          fill2={pellete.light.grey[400]}
          fill1={pellete.light.grey[300]}
        />
      ),
    },
    {
      name: "Badge Name",
      icon: (
        <IconLock
          width={120}
          height={120}
          fill2={pellete.light.grey[400]}
          fill1={pellete.light.grey[300]}
        />
      ),
    },
    {
      name: "Badge Name",
      icon: <IconBadge />,
    },
    {
      name: "Badge Name",
      icon: (
        <IconLock
          width={120}
          height={120}
          fill2={pellete.light.grey[400]}
          fill1={pellete.light.grey[300]}
        />
      ),
    },
    {
      name: "Badge Name",
      icon: (
        <IconLock
          width={120}
          height={120}
          fill2={pellete.light.grey[400]}
          fill1={pellete.light.grey[300]}
        />
      ),
    },
  ],
};

const RewardsComponent = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container sx={{ padding: 0 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={"start"}
        >
          <Typography variant="body1" component="h1" fontWeight={600}>
            Rewards - 302 coins and 1 badge earned
          </Typography>

          <NextLink href="#" passHref>
            <Link color={"inherit"}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ display: "inline-flex" }}
                spacing={1}
              >
                <Typography variant="body2">Know more about rewards</Typography>
                <Iconify
                  icon={"eva:arrow-ios-upward-fill"}
                  sx={{ transform: "rotate(90deg)" }}
                  width={20}
                  height={20}
                />
              </Stack>
            </Link>
          </NextLink>
        </Stack>

        {/* badges */}
        <Stack
          direction={"row"}
          justifyContent="center"
          flexWrap={"wrap"}
          mt={5}
        >
          <Stack
            direction={"row"}
            columnGap={3}
            rowGap={5}
            flexWrap={"wrap"}
            justifyContent="flex-start"
          >
            {/* coins badge */}
            <Stack
              direction="column"
              justifyContent={"space-between"}
              style={{ position: "relative" }}
            >
              <StarFUllNew width={120} height={120} />
              <Typography
                fontWeight={900}
                fontSize={30}
                sx={{
                  position: "absolute",
                  top: "35%",
                  left: "35%",
                  transform: "translate(-27%, -45%)",
                  color: pellete.light.grey[800],
                }}
              >
                {rewards.coins_earned}
              </Typography>
              <Typography variant="body2" component="h1">
                Coins earned till date
              </Typography>
            </Stack>

            {/* rewards badge */}
            {rewards.badges_earned.map((badge, i) => {
              return (
                <Stack
                  direction={"column"}
                  alignItems="center"
                  spacing={1}
                  key={i}
                >
                  {badge.icon}
                  <IconRotate />
                  <Typography variant="body2" component="h1">
                    {badge.name}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
};

export default RewardsComponent;
