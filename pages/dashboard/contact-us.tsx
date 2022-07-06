import { m } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// @mui
import {
  Container,
  Card,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Typography,
  TextField,
  Stack,
  useTheme,
} from "@mui/material";

// components
import { varFade, MotionViewport } from "../../components/animate";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Page from "../../components/Page";
import Layout from "../../layouts";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------

ContactForm.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function ContactForm() {
  const [inputData, setinputData] = useState({
    query: "",
    issue: "",
    text: "",
  });

  const router = useRouter();
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setinputData((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Submitted Successfully");
    setinputData({
      query: "",
      issue: "",
      text: "",
    });
  };

  const isLight = theme.palette.mode === "light";

  return (
    <Page title="User: List">
      <Container component={MotionViewport}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: "bolder",
                fontSize: "22px",
              }}
            >
              <Button
                style={{
                  color: isLight ? "#000" : "#fff",
                  fontSize: "20px",
                  cursor: "Pointer",
                }}
                onClick={() => router.back()}
              >
                <ArrowBackIosNewIcon />
              </Button>
              {/* <Button
                sx={{ minWidth: "32px" }}
                onClick={() => {
                  router.back();
                }}
              >
                <Icon
                  style={{
                    color: isLight ? "#000" : "#fff",
                    fontSize: "20px",
                  }}
                  icon="eva:arrow-ios-back-fill"
                />
              </Button> */}
              Contact Us
            </Typography>
          </Stack>

          <Button
            sx={{
              alignContetnt: "flex-end",
              fontWeight: "bold",
              width: "100px",
              gap: "10px",
              cursor: "Pointer",
            }}
            variant="contained"
            disabled={!inputData.query || !inputData.issue || !inputData.text}
            onClick={handleSubmit}
          >
            {<SendIcon style={{ color: "white" }} />} Send
          </Button>
        </Stack>

        <Card sx={{ padding: "15px", marginTop: "30px" }}>
          <Stack spacing={10} sx={{ margin: "5px 5px" }}>
            <Stack spacing={3}>
              <m.div variants={varFade().inUp}>
                <FormControl fullWidth>
                  <InputLabel>Which course do you need help with?</InputLabel>
                  <Select
                    required
                    name="query"
                    value={inputData.query}
                    label="Which course do you need help with?"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Introduction To Coding</MenuItem>
                    <MenuItem value={2}>Python Basic</MenuItem>
                    <MenuItem value={3}>Certificate in Data Science</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                  </Select>
                </FormControl>
              </m.div>

              <m.div variants={varFade().inUp}>
                <FormControl fullWidth>
                  <InputLabel>
                    Which area in the above course do uou need help with?
                  </InputLabel>
                  <Select
                    required
                    name="issue"
                    value={inputData.issue}
                    label="Which area in the above course do uou need help with?"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Query About CourseNames</MenuItem>
                    <MenuItem value={2}>Query About Lessons</MenuItem>
                    <MenuItem value={3}>Query About Certification</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                  </Select>
                </FormControl>
              </m.div>

              <m.div variants={varFade().inUp}>
                <TextField
                  fullWidth
                  required
                  name="text"
                  onChange={handleChange}
                  value={inputData.text}
                  label="Type your query here(upto 1000 characters)"
                />
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: "#2196f3" }}>
                  Once you send this message, you will receive an email at your
                  registered email ID where the concerned person is also
                  marked.We request you to use the same email to communicate
                  further on this query.
                </Typography>
              </m.div>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
