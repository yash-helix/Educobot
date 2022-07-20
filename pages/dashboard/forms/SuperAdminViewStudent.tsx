import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import { useSnackbar } from "notistack";
// next
import { useRouter } from "next/router";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
// import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Alert,
  useTheme,
  Button,
  Select,
  InputLabel,
} from "@mui/material";

//hooks
import useResponsive from "../../../hooks/useResponsive";
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import axios from "../../../utils/axios";

import { UploadAvatar } from "../../../components/upload";
// utils
import { fData } from "../../../utils/formatNumber";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// @types
import { UserManager } from "../../../@types/user";

// components
import Label from "../../../components/Label";

import { DatePicker, MobileDatePicker, DesktopDatePicker } from "@mui/lab";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  RHFSwitch,
} from "../../../components/hook-form";
import Layout from "../../../layouts";
import { width } from "@mui/system";
import Check from "@mui/icons-material/Check";
// import theme from "../../../theme"
// ----------------------------------------------------------------------

type FormValuesProps = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  schoolName: string;
  classDetails: any;
  avatarUrl: string;
  isVerified: boolean;
};

type Props = {
  isEdit?: boolean;
  currentTeacher?: FormValuesProps;
};

SuperAdminViewStudent.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function SuperAdminViewStudent({
  isEdit = false,
  currentTeacher,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);

  const StudentFormSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    middleName: Yup.string().required("Middle name required"),
    lastName: Yup.string().required("Last name required"),
    DateOfBirth: Yup.date().nullable().required("Date of birth required"),
    gender: Yup.string().oneOf(["1", "2"]).required("Gender required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number required").min(10).max(12),
    address: Yup.string().required("Address required"),
    parentFirstName: Yup.string().required("First name required"),
    parentMiddleName: Yup.string().required("Middle Name required"),
    parentLastName: Yup.string().required("Last name required"),
    parentEmail: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    parentPhone: Yup.string().required("Phone Number required").min(10).max(12),
    relationship: Yup.string().required("Relationship required"),
    schoolName: Yup.string().required("School name required"),
    division: Yup.string().required("Division required"),
    class: Yup.string().required("Class required"),
    rollNumber: Yup.number().required("Roll number required"),
    AcademicYear: Yup.string().required("Academic Year is required"),
    UID: Yup.number().required("UID is required"),
    GRNumber: Yup.number().required("GR number is required"),
    CourseName: Yup.string().required("Select option from below"),
    courseName: Yup.string().required("select option from below"),
    relationwithStudent: Yup.string().required("Relation to be specified"),
    CourseStatus: Yup.string().required("Please select option"),
    courseStatus: Yup.string().required("Please select option"),
    avatarUrl: Yup.mixed().test(
      "required",
      "Avatar is required",
      (value) => value !== ""
    ),
  });

  const router = useRouter();
  const theme = useTheme();

  const defaultValues = useMemo(
    () => ({
      firstName: currentTeacher?.firstName || "",
      middleName: currentTeacher?.middleName || "",
      lastName: currentTeacher?.lastName || "",
      email: currentTeacher?.email || "",
      phone: currentTeacher?.phone || "",
      address: currentTeacher?.address || "",
      schoolName: currentTeacher?.schoolName || "",
      classDetails: currentTeacher?.classDetails || "",
      avatarUrl: currentTeacher?.avatarUrl || "",
      isVerified: currentTeacher?.isVerified || false,
    }),
    [currentTeacher]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(StudentFormSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    control,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
    },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setAvataFieldStatus(true);
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (isEdit && currentTeacher) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTeacher]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      //   const apibody = {
      //     firstName: data.firstName,
      //     middleName: data.middleName,
      //     lastName: data.lastName,
      //     email: data.email,
      //     phone: data.phone,
      //     address: data.address,
      //     schoolName: data.schoolName,
      //     avatarUrl: data.avatarUrl,
      //     isVerified: data.isVerified,
      //   };
      //   console.log(apibody);
      // reset();
    } catch (error: any) {
      console.error(error);
      //   reset();
      //   if (isMountedRef.current) {
      //     setError("afterSubmit", { ...error, message: error.message });
      //   }
    }
  };

  const isLight = theme.palette.mode === "light";

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3, gap: "10px" }}
      >
        <Typography
          variant={"h4"}
          sx={{ color: "text.primary", fontWeight: 700 }}
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
          Student Details
        </Typography>
        <Button
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
          disabled={Object.keys(dirtyFields).length === 0 && !isAvatarChanged}
        >
          <CheckIcon style={{ color: "white" }} />
          Update
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
                DropZonesx={undefined}
              />
            </Box>

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabling this will automatically send the user a
                    verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Student details
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="firstName" label="First name" />
                <RHFTextField name="middleName" label="Middle name" />
                <RHFTextField name="lastName" label="Last name" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="DateOfBirth" label="Date Of Birth" />
                {/* <RHFSelect>Gender</InputLabel> */}
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="gender"
                  // value={inputData.query}
                  label="Gender"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </RHFSelect>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFTextField name="email" label="Email ID" />
                <RHFTextField
                  name="phone"
                  label="Mobile number"
                  type="number"
                  onKeyDown={(event) => {
                    ["e", "E", "+", "-"].includes(event.key) &&
                      event.preventDefault();
                  }}
                />
              </Stack>

              <RHFTextField name="address" label="Address" type={"text"} />

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Subscription details
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="CourseName"
                  // value={inputData.query}
                  label="Course Name"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Introduction To Coding</MenuItem>
                  <MenuItem value={2}>Python Basic</MenuItem>
                  <MenuItem value={3}>Data Science</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="CourseStatus"
                  // value={inputData.query}
                  label="Course Status"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Subscribed-Paid,50%</MenuItem>
                  <MenuItem value={2}>Subscribed-Paid,100%</MenuItem>
                  <MenuItem value={2}>Trial</MenuItem>
                </RHFSelect>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="courseName"
                  // value={inputData.query}
                  label="Course Name"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Certificate in Coding</MenuItem>
                  <MenuItem value={2}>Certificate in Python</MenuItem>
                  <MenuItem value={3}>Certificate in Data Science</MenuItem>
                </RHFSelect>

                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="courseStatus"
                  // value={inputData.query}
                  label="Course Status"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Trial-User</MenuItem>
                  <MenuItem value={2}>Active-User</MenuItem>
                  <MenuItem value={3}>Inactive-User</MenuItem>
                </RHFSelect>
              </Stack>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Parent details
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="parentFirstName" label="First name" />
                <RHFTextField name="parentMiddleName" label="Middle name" />
                <RHFTextField name="parentLastName" label="Last name" />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFTextField name="parentEmail" label="Email ID" />
                <RHFTextField
                  name="parentPhone"
                  label="Mobile number"
                  type="number"
                  onKeyDown={(event) => {
                    ["e", "E", "+", "-"].includes(event.key) &&
                      event.preventDefault();
                  }}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row", width: "column" }}
                spacing={2}
              >
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="relationwithStudent"
                  label="Relation with Student"
                  sx={{ width: "50%" }}
                >
                  <MenuItem value={1}>Mother</MenuItem>
                  <MenuItem value={2}>Father</MenuItem>
                </RHFSelect>
              </Stack>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                School details
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="schoolName" label="School Name" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="class" label="Class(Standard)" />
                <RHFTextField name="division" label="Division" />
                <RHFTextField name="rollNumber" label="Roll Number" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="AcademicYear" label="Academic year" />
                <RHFTextField name="UID" label="UID" />
                <RHFTextField name="GRNumber" label="GR Number" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
