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
import { boolean } from "yup/lib/locale";
// ----------------------------------------------------------------------

type FormValuesProps = {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  email: string;
  phone: string;
  address: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  relationship: string;
  schoolName: string;
  board: string;
  class: string;
  avatarUrl: string;
  isVerified: boolean;
  afterSubmit?: string;
};

type Props = {
  isEdit?: boolean;
  currentUser?: FormValuesProps;
};
export default function SaasStudentEditForm({
  isEdit = false,
  currentUser,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);

  const StudentFormSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    middleName: Yup.string().required("Middle name required"),
    lastName: Yup.string().required("Last name required"),
    dob: Yup.date().nullable().required("Date of birth required"),
    gender: Yup.string().required("Gender required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone Number required").min(10).max(12),
    address: Yup.string().required("Address required"),
    parentFirstName: Yup.string().required("First name required"),
    parentLastName: Yup.string().required("Last name required"),
    parentEmail: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    parentPhone: Yup.string().required("Phone Number required").min(10).max(12),
    relationship: Yup.string().required("Relationship required"),
    schoolName: Yup.string().required("School name required"),
    board: Yup.string().required("Board required"),
    class: Yup.string().required("Class required"),
    avatarUrl: Yup.mixed().test(
      "required",
      "Avatar is required",
      (value) => value !== ""
    ),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || "",
      middleName: currentUser?.middleName || "",
      lastName: currentUser?.lastName || "",
      dob: currentUser?.dob || null,
      gender: currentUser?.gender || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      parentFirstName: currentUser?.parentFirstName || "",
      parentLastName: currentUser?.parentLastName || "",
      parentEmail: currentUser?.parentEmail || "",
      parentPhone: currentUser?.parentPhone || "",
      relationship: currentUser?.relationship || "",
      schoolName: currentUser?.schoolName || "",
      board: currentUser?.board || "",
      class: currentUser?.class || "",
      avatarUrl: currentUser?.avatarUrl || "",
      isVerified: currentUser?.isVerified || false,
    }),
    [currentUser]
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
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
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
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const apibody = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dob: data.dob,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
        parentFirstName: data.parentFirstName,
        parentLastName: data.parentLastName,
        parentEmail: data.parentEmail,
        parentPhone: data.parentPhone,
        relationship: data.relationship,
        schoolName: data.schoolName,
        board: data.board,
        class: data.class,
        avatarUrl: data.avatarUrl,
        isVerified: data.isVerified,
      };
      console.log(apibody);
      // reset();
    } catch (error: any) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
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
          Profile-Student
        </Typography>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isDirty && !isAvatarChanged}
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
                <Controller
                  name="dob"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <RHFSelect
                  native={false}
                  name="gender"
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
                Parent details
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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

              <RHFSelect
                native={false}
                name="relationship"
                label="Relation with student"
                defaultValue={""}
              >
                <MenuItem key={1} value={1}>
                  Mother
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Father
                </MenuItem>
              </RHFSelect>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                School details
              </Typography>

              <RHFTextField name="schoolName" label="School name" />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFSelect
                  native={false}
                  name="board"
                  label="Board"
                  defaultValue={""}
                >
                  <MenuItem key={1} value={1}>
                    HSC
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    SSC
                  </MenuItem>
                </RHFSelect>
                <RHFTextField name="class" label="Class" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
