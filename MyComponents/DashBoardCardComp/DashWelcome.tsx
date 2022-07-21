import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  AlertTitle,
  Button,
  Grid,
  Stack,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
// @mui
import { useTheme, styled, alpha } from "@mui/material/styles";
import InvitationCard from "./InvitationCardComp/InvitationCard";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../components/hook-form";

import { LoadingButton } from "@mui/lab";
import Iconify from "../../components/Iconify";

type FormValuesProps = {
  rollNumber: string;
  otp: string;
};

const CourseNames = ["Introduction To Coding", "Python Basic", "Certificate in Data Science"];

export default function DashWelcome() {
  const theme = useTheme();
  const [selectedCourse, setSelectedCourse] = useState("python");

  const [CourseName, setCourseName] = useState(localStorage.getItem("course") || "Introduction To Coding");
  const [OpenTitleDDL, setOpenTitleDDL] = useState<null | HTMLElement>(null);

  const RegisterSchema = Yup.object().shape({
    rollNumber: Yup.string().required("Roll Number Required"),
    otp: Yup.string().required("OTP required"),
  });

  const defaultValues = {
    rollNumber: "",
    otp: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const token = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const apibody = {
        rollNumber: data.rollNumber,
        otp: data.otp,
        token: token,
        userID: userID,
      };

      console.log(apibody);
      // const response = await axios.post("users/postContactUs", apibody);
      // response.status === 200 && reset();
      // console.log(response);
    } catch (error: any) {
      console.error(error);
      reset();
    }
  };

  const changeCourse = (event: any) => {
    setSelectedCourse(event.target.value);
  };

  const handleOpenTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenTitleDDL(event.currentTarget);
  };

  const handleCloseTitleDDL = (event: any, title: string) => {
    setCourseName(title)
    setOpenTitleDDL(null)
    localStorage.setItem("course", title)
  };


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* CourseName */}
        <Stack
            width={{ xs: "100%", sm: "auto" }}
            direction={{ xs: "column", sm: "row" }}
            // spacing={2}
          >
            <Button color="inherit" onClick={handleOpenTitle}>
              <Typography variant="h5" component={"h1"}>
                {CourseName}
              </Typography>
              <Iconify
                icon={
                  OpenTitleDDL
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.6, width: 16, height: 16 }}
              />
            </Button>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={OpenTitleDDL}
              onClose={(e) => handleCloseTitleDDL(e, CourseName)}
              open={Boolean(OpenTitleDDL)}
            >
              {CourseNames.map((title) => (
                <MenuItem
                  key={title}
                  onClick={(e) => handleCloseTitleDDL(e, title)}
                >
                  {title}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
      </FormProvider>
    </>
  );
}


{/* <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
        >
          <Typography variant="h5" component="h1">
            Introduction To Coding
          </Typography>

          {/* <Stack
            width={{ xs: "100%", sm: "auto" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <RHFTextField
              name="rollNumber"
              variant="outlined"
              placeholder="Roll number"
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
            />
            <RHFTextField
              name="otp"
              variant="outlined"
              placeholder="OTP"
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Start Lesson
            </LoadingButton>
          </Stack>
        </Stack>*/}





 {/* <RadioGroup */}
      {/* <RadioGroup
        row
        defaultValue="python"
        name="course_name"
        onChange={changeCourse}
      >
        <FormControlLabel
          value="python"
          control={<Radio />}
          label={
            selectedCourse === "python" ? (
              <Typography variant="h6">
                Certificate in Python Programming
              </Typography>
            ) : (
              <Typography variant="h6" color={theme.palette.grey[500]}>
                Certificate in Python Programming
              </Typography>
            )
          }
        />
        <FormControlLabel
          value="data_science"
          control={<Radio />}
          label={
            selectedCourse === "data_science" ? (
              <Typography variant="h6">Certificate in Data Science</Typography>
            ) : (
              <Typography variant="h6" color={theme.palette.grey[500]}>
                Certificate in Data Science
              </Typography>
            )
          }
        />
      </RadioGroup>

      <Grid container spacing={3}>
        <Grid item xs={12}>
      </RadioGroup> */}

      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup
            row
            defaultValue="python"
            name="course_name"
            onChange={changeCourse}
          >
            <FormControlLabel
              value="python"
              control={<Radio />}
              label={
                selectedCourse === "python" ? (
                  <Typography variant="h6">
                    Certificate in Python Programming
                  </Typography>
                ) : (
                  <Typography variant="h6" color={theme.palette.grey[500]}>
                    Certificate in Python Programming
                  </Typography>
                )
              }
            />
            <FormControlLabel
              value="data_science"
              control={<Radio />}
              label={
                selectedCourse === "data_science" ? (
                  <Typography variant="h6">
                    Certificate in Data Science
                  </Typography>
                ) : (
                  <Typography variant="h6" color={theme.palette.grey[500]}>
                    Certificate in Data Science
                  </Typography>
                )
              }
            />
          </RadioGroup>
        </Grid>
        {/* <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="info"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            onClose={() => {}}
          >
            <AlertTitle>Milestone coming up</AlertTitle>
            This is an info alert — <strong>check it out!</strong>
          </Alert>
        </Grid> */}

        {/* <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            onClose={() => {}}
          >
            <AlertTitle>
              {"Congratulations on winning the <badge name> badge"}
            </AlertTitle>
            This is an Success alert — <strong>check it out!</strong>
          </Alert>
        </Grid> */}

        {/* <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="warning"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.common.black, 0.48)}`,
                }}
              >
                Renew now
              </Button>
            }
          >
            <AlertTitle>
              {"Your course <course name> will expire on 24 April 2024"}
            </AlertTitle>
            This is an Warning alert — <strong>check it out!</strong>
          </Alert>
        </Grid> */}

        {/* <Grid item xs={12}>
          <Alert
            variant="filled"
            severity="error"
            sx={{ fontSize: "14px", fontWeight: 400, alignItems: "center" }}
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.common.white, 0.48)}`,
                }}
              >
                Renew now
              </Button>
            }
          >
            <AlertTitle>{"Your course <course name> has expired"}</AlertTitle>
            Courses expire after 36 months. Renew for 36 months at a discounted
            price of INR 2500/-
          </Alert>
        </Grid> */}
{/* 
        <Grid item xs={12}>
          <InvitationCard />
        </Grid>
      </Grid> */}