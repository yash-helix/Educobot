import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
// import AddIcon from "@mui/icons-material/Add";
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

import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile,
} from "../../../components/upload";
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
  RHFUploadSingleFile,
  RHFUploadMultiFile,
} from "../../../components/hook-form";
import Layout from "../../../layouts";
import { width } from "@mui/system";
import Check from "@mui/icons-material/Check";
import BlockContent from "../../../components/upload/BlockContent";
import { UploadIllustration } from "../../../assets";
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

SchoolStudentProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function SchoolStudentProfile({
  isEdit = false,
  currentTeacher,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);

  const StudentFormSchema = Yup.object().shape({
    RollNumber: Yup.string().required("Roll Number is required"),
    Division: Yup.string().required("Please Enter Division"),
    SchoolName: Yup.string().required("Please Enter School Name"),
    Class: Yup.string().required("Please Enter Class"),
    FirstName: Yup.string().required("Please Enter Name"),
    MiddleName: Yup.string().required("Please Enter Middlename"),
    LastName: Yup.string().required("Please Enter Lastname"),
    Date: Yup.string().required("Date is required"),
    Gender: Yup.string().required("Gender is required"),
    Email: Yup.string().required("Email id is required"),
    Phone: Yup.string().required("Mobile Number is required"),
    Address: Yup.string().required("Address is required"),
    parentFirstName: Yup.string().required("First Name is required"),
    parentLastName: Yup.string().required("Last Name is required"),
    parentPhone: Yup.string().required("Mobile Number is required"),
    parentEmail: Yup.string().required("Email is required"),
    relationwithStudent: Yup.string().required("Relation is required"),
    AcademicYear: Yup.string().required("Plaese Enter Academic year"),
    UID: Yup.string().required("Uid is required"),
    GRNumber: Yup.string().required("GR Number is required"),
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
      avatarUrl: "",
      isVerified: false,
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
          Profile - Student
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            sx={{ gap: "10px" }}
            size="large"
            type="submit"
            variant="contained"
            disabled={Object.keys(dirtyFields).length === 0 && !isAvatarChanged}
          >
            <CheckIcon sx={{ color: "white" }} />
            Update
          </Button>
        </Stack>
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
                Personal details
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="FirstName" label="First Name" />
                <RHFTextField name="MiddleName" label="MiddleName" />
                <RHFTextField name="LastName" label="LastName" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="Date" label="Date" />

                <RHFSelect
                  native={false}
                  name="Gender"
                  label="Gender"
                  defaultValue={""}
                >
                  <MenuItem key={1} value={1}>
                    Male
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Female
                  </MenuItem>
                </RHFSelect>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFTextField name="Email" label="Email ID" />
                <RHFTextField
                  name="Phone"
                  label="Mobile number"
                  type="number"
                  onKeyDown={(event) => {
                    ["e", "E", "+", "-"].includes(event.key) &&
                      event.preventDefault();
                  }}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="Address" label="Address" />
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
                <RHFTextField name="SchoolName" label="School Name" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="Class" label="Class(Standard)" />
                <RHFTextField name="Division" label="Division" />
                <RHFTextField name="RollNumber" label="Roll number" />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFTextField name="AcademicYear" label="Academic Year" />
                <RHFTextField name="UID" label="UID" />
                <RHFTextField name="GRNumber" label="GR Number" />
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
                  name="relationwithStudent"
                  label="Relation with Student"
                  defaultValue={""}
                  // sx={{ width: "50%" }}
                >
                  <MenuItem value={1}>Mother</MenuItem>
                  <MenuItem value={2}>Father</MenuItem>
                </RHFSelect>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
