import * as Yup from "yup";
import { useState } from "react";
// next
import NextLink from "next/link";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";
// hooks
import useAuth from "../hooks/useAuth";
import useIsMountedRef from "../hooks/useIsMountedRef";
// components
import Iconify from "../components/Iconify";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../components/hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import jwtDecode from "jwt-decode";

const url:any = process.env.devUrl;

// ----------------------------------------------------------------------

type FormValuesProps = {
  rollno: string;
  otp: string;
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [otpError, setOtpError] = useState(false);

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address"),

    password: Yup.string(),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  let {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps, e:any) => {
    try {
      setOtpError(false);
      setErrMsg("");
      const { rollno, otp, email, password } = data;

      if (rollno && otp) {
        const apibody = {
          "email": "",
          "password": "",
          "otp": otp,
          "rollNo": rollno
        }
        const response = await axios.post(`${url.EduCobotBaseUrl}/${url.getUser}`, apibody);
        if (response.data.token) {
          const { exp, userID }: any = await jwtDecode(response.data.token)

          if (Date.now() >= (exp * 1000) == false) {
            router.push(`/dashboard/student/StudentOTPLogin?id=${userID}&otp=${otp}`)
          }
          else {
            setErrMsg("OTP is expired")
            setOtpError(true);
          }
        }
        else {
          setErrMsg("Invalid Roll No. or OTP")
          setOtpError(true);
        }
        e.target.reset()
      }

      else if (email !== '' && password !== '') {
        const res = await login(data.email, data.password);
        if(typeof(res) == 'undefined'){
          setOtpError(true);
          setErrMsg("Invalid Credentials")
        }
      }

      else {
        setOtpError(true);
        if(!rollno && !otp){
          setErrMsg("Roll No. and OTP required")
        }
        else{
          setErrMsg("Email and password is required")
        }
        e.target.reset()
      }
    }
    catch (error: any) {
      setOtpError(true);
      setErrMsg("Invalid Credentials")
      e.target.reset();

      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      {!!errors.afterSubmit && !otpError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Wrong credentials or User does not exist
        </Alert>
      )}

      {
        otpError &&
        <Alert severity="error" sx={{ mb: 2 }}>
          {errMsg}
        </Alert>
      }

      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        In school using OTP given by teacher
      </Typography>

      <Stack
        width={{ xs: "100%", sm: "auto" }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <RHFTextField name="rollno" label="Roll number" type="number"
          onKeyDown={(event) => {
            ["e", "E", "+", "-"].includes(event.key) &&
              event.preventDefault();
          }} />
        <RHFTextField name="otp" label="OTP" type="number"
          onKeyDown={(event) => {
            ["e", "E", "+", "-"].includes(event.key) &&
              event.preventDefault();
          }} />
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>

      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        At home using Email ID
      </Typography>

      <Stack spacing={3}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}
        {/* {!!errors.afterSubmit && (
          <Alert severity="error">
            Wrong credentials or User does not exist
          </Alert>
        )} */}

        <RHFTextField name="email" label="Email address"/>

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.forgotPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
