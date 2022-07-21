import * as Yup from "yup";
import { useState } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../hooks/useAuth";
import useIsMountedRef from "../hooks/useIsMountedRef";
import axios from "../utils/axios";
// components
import Iconify from "../components/Iconify";
import { FormProvider, RHFSelect, RHFTextField } from "../components/hook-form";

const {postContactUS}:any = process.env.devUrl;

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  findUs: string;
  help: string;
  firstName: string;
  lastName: string;
  mobile: string;
  afterSubmit?: string;
};

export default function ContactUsForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile Number is required").min(10).max(12),
    findUs: Yup.string().required("Please select a value"),
    help: Yup.string().required("write your query"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    findUs: "",
    help: "",
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
      // await register(data.email, data.findUs, data.firstName, data.lastName);

      const apibody = {
        cuType: "basic",
        cuBusiness: "",
        cuPinCode: null,
        cuCity: null,
        curriculum: "",
        cuNoofStudents: null,
        cuFName: data.firstName,
        cuLName: data.lastName,
        cuEmailID: data.email,
        cuMobile: data.mobile,
        cuFindUs: data.findUs,
        cuHelpU: data.help,
      };

      // console.log(apibody);

      // 'Access-Control-Allow-Headers':
      //         'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Methods':
      //         'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',

      // const response = await axios.post("/users/postContactUS", {
      //   data: apibody,
      //   headers: {
      //     "Access-Control-Allow-Headers":
      //       "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "POST",
      //   },
      // });

      const response = await axios.post(postContactUS, apibody);
      response.status === 200 && reset();
      console.log(response);
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
      <Stack spacing={3}>
        {!!errors.afterSubmit ? (
          // <Alert severity="error">{errors.afterSubmit.message}</Alert>
          <Alert severity="error">Something went wrong</Alert>
        ) : (
          isSubmitSuccessful && ( //isSubmitSuccessful returns true after the form is submitted without any promise rejection or error been thrown within the handleSubmit callback
            <Alert severity="success">Enquiry Submitted Successfully</Alert>
          )
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="email" label="Email address" />
          <RHFTextField
            name="mobile"
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
          name="findUs"
          label="how did you find us"
          defaultValue={""}
        >
          <MenuItem key={1} value={1}>
            1
          </MenuItem>
        </RHFSelect>
        <RHFTextField name="help" label="How can we help you?" type={"text"} />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
