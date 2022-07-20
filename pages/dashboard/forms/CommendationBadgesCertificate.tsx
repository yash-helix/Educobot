import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
// import CheckIcon from "@mui/icons-material/Check";
// import { useSnackbar } from "notistack";
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

CommendationBadgesCertificate.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};

export default function CommendationBadgesCertificate({
  isEdit = false,
  currentTeacher,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);

  const StudentFormSchema = Yup.object().shape({
    CourseName: Yup.string().required("Course Name is required"),
    CertificateType: Yup.string().required("Certificate type is required"),
    Participatedin: Yup.string().required("Please select this field"),
    Awardedafterwinning: Yup.string().required("Please select this field"),
    WhichBadge: Yup.string().required("Please select this field"),
    Congratulatorymessage: Yup.string().required("Please write something"),
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
      CourseName: "",
      CertificateType: "",
      Participatedin: "",
      WhichBadge: "",
      Awardedafterwinning: "",
      Congratulatorymessage: "",
      avatarUrl: "",
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

  //   const clearData = (e) => {
  //     e.preventDefault();
  //     setValues((prevState) => ({
  //       ...prevState,
  //       CourseName: "",
  //       CertificateType: "",
  //       TotalLessons: "",
  //       Awardaftercompleting: "",
  //       Congratulatorymessage: "",
  //       avatarUrl: "",
  //     }));
  //   };

  const isLight = theme.palette.mode === "light";

  const UploadImg = () => {
    if (!isAvatarChanged) {
      alert("Please Select Image to UPLOAD");
    } else {
      alert("Successfully image uploaded");
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
          Add Certificate
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
            sx={{ color: "black", backgroundColor: "whitesmoke" }}
            size="large"
            variant="outlined"
            onClick={() => {
              console.log("Clear");
              reset(defaultValues);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ gap: "10px" }}
            size="large"
            type="submit"
            variant="contained"
            disabled={Object.keys(dirtyFields).length === 0 && !isAvatarChanged}
            // loading={isSubmitting}
          >
            <AddIcon />
            Add
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 1 }}>
            <Box>
              <RHFUploadAvatar
                sx={{ border: "none", width: "100%", height: "180px" }}
                DropZonesx={"certificate"}
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />
            </Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "300px",
                  height: "30px",
                }}
                onClick={UploadImg}
              >
                Change
              </Button>
            </Stack>
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
                <RHFSelect
                  native={false}
                  name="CourseName"
                  // value={inputData.query}
                  label="Course Name"
                  defaultValue={""}
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>A</MenuItem>
                  <MenuItem value={2}>B</MenuItem>
                </RHFSelect>

                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="CertificateType"
                  // value={inputData.query}
                  label="Certificate Type"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>A</MenuItem>
                  <MenuItem value={2}>B</MenuItem>
                </RHFSelect>
              </Stack>

              <Typography
                variant={"h5"}
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                Select after taking which specific lesson would you like to
                award this certificate
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="Awardedafterwinning"
                  // value={inputData.query}
                  label="Awarded after winning"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Lesson 1</MenuItem>
                  <MenuItem value={2}>Lesson 2</MenuItem>
                </RHFSelect>
              </Stack>

              <Stack>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="WhichBadge"
                  // value={inputData.query}
                  label="Which Badge?"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Lesson 1</MenuItem>
                  <MenuItem value={2}>Lesson 2</MenuItem>
                </RHFSelect>
              </Stack>

              <RHFTextField
                name="Congratulatorymessage"
                label="Congratulatory message (upto 250 characters)"
                type={"text"}
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
