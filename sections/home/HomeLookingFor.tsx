import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 8, md: 3 }}
        >
          <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <m.div variants={varFade().inDown}>
              <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
                About eduCOBOT
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h2" sx={{ mt: 2, mb: 5 }}>
                “All it takes is five<br />
                minutes a day to <br />
                go from no code <br />
                to data science.”
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="overline" component="div" sx={{ color: 'text.disabled', mb: 3 }}>
                eduCOBOT is an educational application with a <br />
                revolutionary approach to teach coding.
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                target="_blank"
                rel="noopener"
                href="https://material-ui.com/store/items/zone-landing-page/"
                endIcon={<Iconify icon={'ic:round-arrow-right-alt'} />}
              >
                Learn More
              </Button>
            </m.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              component={m.div}
              variants={varFade().inUp}
              sx={{
                mb: { xs: 3, md: 0 },
              }}
            >
              <Image
                disabledEffect
                alt="rocket"
                src="./imgs/home/WepappMobile.png"
              // src="https://minimal-assets-api.vercel.app/assets/images/home/zone_screen.png"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
