import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
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
  Snackbar,
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
import horizontal from "../../../components/nav-section/horizontal";
import vertical from "../../../components/nav-section/vertical";
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

SchoolAdminClassrooms.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function SchoolAdminClassrooms({
  isEdit = false,
  currentTeacher,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const StudentFormSchema = Yup.object().shape({});

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

  // <Alert severity="warning">No Teacher Selected</Alert>

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const isLight = theme.palette.mode === "light";

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} md={8}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            sx={{ width: "100%" }}
            onClose={handleClose}
            severity="warning"
          >
            You have not added any teachers. Please add teachers before you can
            assign them to the below classes.
          </Alert>
        </Snackbar>

        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography
              variant={"h4"}
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              Class 3
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division1"
                label="Division"
              >
                <MenuItem value={1}>A</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division2"
                label="Division"
              >
                <MenuItem value={1}>B</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division3"
                label="Division"
              >
                <MenuItem value={1}>C</MenuItem>
              </RHFSelect>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher1"
                label="Teacher for A"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher2"
                label="Teacher for B"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher3"
                label="Teacher for C"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>
            </Stack>

            <Typography
              variant={"h4"}
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              Class 4
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division4"
                label="Division"
              >
                <MenuItem value={1}>A</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division5"
                label="Division"
              >
                <MenuItem value={1}>B</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division6"
                label="Division"
              >
                <MenuItem value={1}>C</MenuItem>
              </RHFSelect>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher4"
                label="Teacher for A"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher5"
                label="Teacher for B"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher6"
                label="Teacher for C"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>
            </Stack>

            <Typography
              variant={"h4"}
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              Class 5
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division7"
                label="Division"
              >
                <MenuItem value={1}>A</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division8"
                label="Division"
              >
                <MenuItem value={1}>B</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division9"
                label="Division"
              >
                <MenuItem value={1}>C</MenuItem>
              </RHFSelect>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher7"
                label="Teacher for A"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher8"
                label="Teacher for B"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher9"
                label="Teacher for C"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>
            </Stack>

            <Typography
              variant={"h4"}
              sx={{ color: "text.primary", fontWeight: 700 }}
            >
              Class 6
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division10"
                label="Division"
              >
                <MenuItem value={1}>A</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division11"
                label="Division"
              >
                <MenuItem value={1}>B</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Division12"
                label="Division"
              >
                <MenuItem value={1}>C</MenuItem>
              </RHFSelect>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              spacing={2}
            >
              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher10"
                label="Teacher for A"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher11"
                label="Teacher for B"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>

              <RHFSelect
                native={false}
                defaultValue={""}
                name="Teacher12"
                label="Teacher for C"
                onClick={handleClick}
              >
                <MenuItem value={1}>Pallavi Sarana</MenuItem>
              </RHFSelect>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
