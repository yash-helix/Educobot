// @mui
import { Grid, Button, Divider, Typography } from '@mui/material';
// components
import Iconify from '../components/Iconify';
import useAuth from '../hooks/useAuth';

import GoogleIcon from '../assets/icon_google';

// ----------------------------------------------------------------------
import { facebookProvider, googleProvider } from '../Providers/firebaseAuthProvider';
export default function AuthFirebaseSocial() {
  const { socialMediaAuth } = useAuth();

  const handleClick = async (provider: any) => {
    try {
      await socialMediaAuth(provider)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>

      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        Using Social
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs>
          <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => handleClick(googleProvider)}>
            {/* <Iconify icon={'eva:google-fill'} color="#DF3E30" width={24} height={24} /> */}
            <GoogleIcon />
          </Button>
        </Grid>

        <Grid item xs>
          <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => handleClick(facebookProvider)}>
            <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={24} height={24} />
          </Button>
        </Grid>

        {/* <Grid item xs>
          <Button fullWidth size="large" color="inherit" variant="outlined">
            <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={24} height={24} />
          </Button>
        </Grid> */}
      </Grid>


    </>
  );
}
