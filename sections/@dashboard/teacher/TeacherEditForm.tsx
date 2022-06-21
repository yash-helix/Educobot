import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
// next
import { useRouter } from "next/router";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Alert,
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
  // standard: string;
  // division: string;
  // noOfStudents: number;
  avatarUrl: string;
  isVerified: boolean;
};

type Props = {
  isEdit?: boolean;
  currentTeacher?: FormValuesProps;
};
export default function TeacherEditForm({
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
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number required").min(10).max(12),
    address: Yup.string().required("Address required"),
    schoolName: Yup.string().required("School name required"),
    classDetails: Yup.array().of(
      Yup.object().shape({
        standard: Yup.string().required("Standard required"),
        division: Yup.string().required("Division required"),
        noOfStudents: Yup.string().required("No of students required"),
      })
    ),
    avatarUrl: Yup.mixed().test(
      "required",
      "Avatar is required",
      (value) => value !== ""
    ),
  });

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Typography
          variant={"h4"}
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          Profile-Teacher
        </Typography>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={Object.keys(dirtyFields).length === 0 && !isAvatarChanged}
        >
          Update
        </LoadingButton>
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
                <RHFTextField name="firstName" label="First name" />
                <RHFTextField name="middleName" label="Middle name" />
                <RHFTextField name="lastName" label="Last name" />
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
                School details
              </Typography>

              <RHFTextField
                name="schoolName"
                label="School Name"
                inputProps={{ readOnly: true }}
              />

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Class details
              </Typography>

              {currentTeacher?.classDetails.map((item: any, index: any) => (
                <Stack
                  key={index}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                >
                  <RHFTextField
                    name="standard"
                    label="Class (Standard)"
                    value={item.standard}
                    inputProps={{ readOnly: true }}
                  />
                  <RHFTextField
                    name="division"
                    label="Division"
                    value={item.division}
                    inputProps={{ readOnly: true }}
                  />
                  <RHFTextField
                    name="noOfStudents"
                    label="No. of students"
                    value={item.noOfStudents}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
