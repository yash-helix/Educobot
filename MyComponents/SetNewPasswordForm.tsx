import { useState } from "react";
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { InputAdornment, IconButton, Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../components/hook-form';
import Iconify from '../components/Iconify';
// hooks
import useAuth from '../hooks/useAuth';
import useIsMountedRef from '../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

type FormValuesProps = {
  password: string;
  cpassword: string;
  afterSubmit?: string;
};

export default function SetNewPasswordForm() {

  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    cpassword: Yup.string().required('Confirm your password').oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const {
    reset, setError, handleSubmit,
    formState: { errors, isSubmitting },
} = methods;

const onSubmit = async (data: FormValuesProps) => {
  try {
    // await login(data.password, data.cpassword);
    console.log(data.password, data.cpassword);
  } catch (error: any) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
          setError('afterSubmit', { ...error, message: error.message });
      }
  }
};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="password"
          label="Enter New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="cpassword"
          label="Re-enter new password"
          type={showCpassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCpassword(!showCpassword)} edge="end">
                  <Iconify icon={showCpassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
                />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
