import { useState } from "react";
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Tooltip,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";

// components
import Page from "../components/Page";
import Logo from "../components/Logo";
import Image from "../components/Image";
// sections

import ContactUsForm from "../MyComponents/ContactUsForm";
// import { ContactSchoolForm} from '../MyComponents/Contact Comp/ContactSchoolForm';
// import { ContactCorporateForm } from '../MyComponents/Contact Comp/ContactCorporateForm';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ContactUs() {
  const [whichForm, setForm] = useState("school");
  const router = useRouter();
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Contact us">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Box sx={{ px: 5, mt: 10, mb: 5 }}>
              <Typography variant="h3" sx={{ mb: 4 }}>
                Contact us
              </Typography>
              <Image
                visibleByDefault
                disabledEffect
                alt="register"
                src="/imgs/illustration_upload.svg"
              />
            </Box>
          </SectionStyle>
        )}

        {/* <Container>
                    <ContentStyle>
                        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" gutterBottom>
                                    eduCOBOT
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Logic. Code. Simplified
                                </Typography>
                            </Box>

                        </Box>
                        <ContactUsForm />

                        <Typography variant="h6" align="center" sx={{ mt: 3, cursor: 'pointer' }} onClick={() => router.back()}>
                            GO&nbsp;
                            <Link underline="none" color="primary">
                                Back
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container> */}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Know more about edo
                  <span style={{ fontWeight: 800 }}>COBOT</span>
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Logic. Code. Simplified
                </Typography>
              </Box>
            </Box>

            <ContactUsForm />

            <Typography
              variant="h6"
              align="center"
              sx={{ mt: 3, cursor: "pointer" }}
              onClick={() => router.back()}
            >
              GO&nbsp;
              <Link underline="none" color="primary">
                Back
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
