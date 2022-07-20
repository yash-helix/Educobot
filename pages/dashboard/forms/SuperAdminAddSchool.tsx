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

SuperAdminAddSchool.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function SuperAdminAddSchool({
  isEdit = false,
  currentTeacher,
}: Props) {
  const [selectDate, setDate] = useState<Date | null>(new Date());
  const isDesktop = useResponsive("up", "lg");
  const isMountedRef = useIsMountedRef();
  const [isAvatarChanged, setAvataFieldStatus] = useState(false);

  const StudentFormSchema = Yup.object().shape({
    board: Yup.string().required("Please Select Board"),
    SchoolName: Yup.string().required("Please Enter School Name"),
    LandLineNumber: Yup.string().required("Please enter Number"),
    parentFirstName: Yup.string().required("Please Enter Name"),
    parentMiddleName: Yup.string().required("Please Enter Middle Name"),
    parentLastName: Yup.string().required("Please Enter Last Name"),
    parentPhone: Yup.string().required("Please Enter Number"),
    parentEmail: Yup.string().required("Please Enter email"),
    from: Yup.string().required("Please Select Option from Below"),
    to: Yup.string().required("Please Select option from below"),
    Divisions: Yup.string().required("Please Select Division"),
    Format: Yup.string().required("Please Select option "),
    Course: Yup.string().required("Please Select option"),
    Course1: Yup.string().required("Please Select option"),
    Course2: Yup.string().required("Please Select option"),
    StartFrom: Yup.string().required("Please Select Appropriate option"),
    StartFrom1: Yup.string().required("Please Select Appropriate option"),
    StartFrom2: Yup.string().required("Please Select Appropriate option"),
    AcademicYear: Yup.string().required("Please Select Year"),
    StartsFrom: Yup.string().required("Please select date"),
    ValidityEndDate: Yup.string().required("Please Select the enddate"),
    InvoiceNumber: Yup.string().required("Please make the appropriate choice"),
    AmountinINR: Yup.string().required("Please make the appropriate choice"),
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
          Add student
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
          >
            <AddIcon sx={{ color: "white" }} />
            Add
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
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="board"
                  label="Board"
                >
                  <MenuItem value={1}>ICSC</MenuItem>
                  <MenuItem value={2}>CBSE</MenuItem>
                  <MenuItem value={3}>State Board</MenuItem>
                </RHFSelect>
                <RHFTextField
                  name="LandLineNumber"
                  label="Landline Number"
                  type="number"
                />
              </Stack>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                School admin details
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

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Class settings
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="from"
                  label="From"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="to"
                  label="To"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
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
                  name="Divisions"
                  label="Divisions"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="Format"
                  label="Format"
                >
                  <MenuItem value={1}>A</MenuItem>
                  <MenuItem value={2}>B</MenuItem>
                  <MenuItem value={3}>C</MenuItem>
                  <MenuItem value={4}>D</MenuItem>
                </RHFSelect>
              </Stack>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Curriculum settings
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="Course"
                  label="Course"
                >
                  <MenuItem value={1}>Introduction to Coding</MenuItem>
                  <MenuItem value={2}>
                    Certificate to Python Programming
                  </MenuItem>
                  <MenuItem value={3}>Certificate to Data Science</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="StartFrom"
                  label="Start From"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
                  <MenuItem value={5}>7</MenuItem>
                  <MenuItem value={6}>8</MenuItem>
                  <MenuItem value={7}>9</MenuItem>
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
                  name="Course1"
                  label="Course"
                >
                  <MenuItem value={1}>Introduction to Coding</MenuItem>
                  <MenuItem value={2}>
                    Certificate to Python Programming
                  </MenuItem>
                  <MenuItem value={3}>Certificate to Data Science</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="StartFrom1"
                  label="Start From"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
                  <MenuItem value={5}>7</MenuItem>
                  <MenuItem value={6}>8</MenuItem>
                  <MenuItem value={7}>9</MenuItem>
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
                  name="Course2"
                  label="Course"
                >
                  <MenuItem value={1}>Introduction to Coding</MenuItem>
                  <MenuItem value={2}>
                    Certificate to Python Programming
                  </MenuItem>
                  <MenuItem value={3}>Certificate to Data Science</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="StartFrom2"
                  label="Start From"
                >
                  <MenuItem value={1}>3</MenuItem>
                  <MenuItem value={2}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                  <MenuItem value={4}>6</MenuItem>
                  <MenuItem value={5}>7</MenuItem>
                  <MenuItem value={6}>8</MenuItem>
                  <MenuItem value={7}>9</MenuItem>
                </RHFSelect>
              </Stack>

              <Typography
                variant={"h4"}
                sx={{ color: "text.primary", fontWeight: 700 }}
              >
                Subscription
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                spacing={2}
              >
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="AcademicYear"
                  label="Academic Year"
                >
                  <MenuItem value={1}>2021-22</MenuItem>
                  <MenuItem value={2}>2022-23</MenuItem>
                  <MenuItem value={3}>2023-24</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="StartsFrom"
                  label="Starts From"
                >
                  <MenuItem value={1}>22 June 2022</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="ValidityEndDate"
                  label="Validity End Date"
                >
                  <MenuItem value={1}>21 June 2023</MenuItem>
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
                  name="InvoiceNumber"
                  label="Invoice number"
                >
                  <MenuItem value={1}>INVI704-8000</MenuItem>
                </RHFSelect>
                <RHFSelect
                  native={false}
                  defaultValue={""}
                  name="AmountinINR"
                  label="Amount in INR"
                >
                  <MenuItem value={1}>5305</MenuItem>
                </RHFSelect>
              </Stack>
            </Stack>
          </Card>
          <Typography>
            THIS IS STILL INCOMPLETE FORM UPLOAD FILES IS REMAINING{" "}
          </Typography>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
