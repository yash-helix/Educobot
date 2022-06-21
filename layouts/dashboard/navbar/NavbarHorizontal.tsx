import { memo, useEffect, useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Container, AppBar } from "@mui/material";
// config
import { HEADER } from "../../../config";

// components
import { NavSectionHorizontal } from "../../../components/nav-section";
//
import navConfig, {
  studentConfig,
  teacherConfig,
  schoolAdminConfig,
  superAdminConfig,
} from "./NavConfig";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create("top", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: "100%",
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const [whichNavBar, setNavBar] = useState(navConfig); //roleconfig.default
  const { user } = useAuth();

  useEffect(() => {
    const role = user?.role;
    if (role === "anurag.av@helixsta.in") {
      setNavBar(studentConfig);
    } else if (role === "Teacher") {
      setNavBar(teacherConfig);
    } else if (role === "schooladmin@gmail.com") {
      setNavBar(schoolAdminConfig);
    } else if (role === "superadmin@gmail.com") {
      setNavBar(superAdminConfig);
    } else {
      setNavBar(navConfig);
    }

    // if(role) setNavBar(roleConfig[`${role.toLowerCase()}`])

  }, [whichNavBar]);
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={whichNavBar} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
