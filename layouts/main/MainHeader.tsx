// next
import { useRouter } from "next/router";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
import useResponsive from "../../hooks/useResponsive";
// utils
import cssStyles from "../../utils/cssStyles";
// config
import { HEADER } from "../../config";

// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import { phoneMenuConfig } from "./MenuConfig";
import { useState } from "react";
import SettingMode from "../../components/settings/SettingMode";
import { RHFSelect } from "../../components/hook-form";
import useLocales from "../../hooks/useLocales";

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useRouter();
  const { allLang, currentLang, onChangeLang } = useLocales();

  const isDesktop = useResponsive("up", "md");

  const isHome = pathname === "/";
  const [seriesData, setSeriesData] = useState(2019);

  const handleChangeSeriesData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeriesData(Number(event.target.value));
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo sx={{ width: "auto" }} />
          <TextField
            id="edu"
            select
            variant="standard"
            value={currentLang.value}
            sx={{ marginLeft: "16px", marginBottom: "18px" }}
            onChange={(event) => onChangeLang(event.target.value)}
          >
            {allLang.map((lang) => (
              <MenuItem key={lang.label} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && (
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}

          {isDesktop && (
            <>
              <Button
                variant="outlined"
                target="_blank"
                rel="noopener"
                href="/auth/login"
                sx={{ marginRight: 1 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                target="_blank"
                rel="noopener"
                href="/auth/registeration"
              >
                Sign Up
              </Button>
            </>
          )}

          <SettingMode />
          {!isDesktop && (
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={phoneMenuConfig}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
