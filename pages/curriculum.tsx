import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Link, Stack, Button, Divider, Container, Typography, } from '@mui/material';

// CARD  CONTENTS
import { _homePlans } from '../staticData';
// components
import Image from '../components/Image';
import Iconify from '../components/Iconify';
import { varFade, MotionViewport } from '../components/animate';
import Layout from '../layouts';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.neutral,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}));

// ----------------------------------------------------------------------
Curriculum.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="main">{page}</Layout>;
};

export default function Curriculum() {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    return (
        <RootStyle>
            <Container component={MotionViewport}>
                <Box sx={{ mb: 10, textAlign: 'center' }}>
                    <m.div variants={varFade().inUp}>
                        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                            CURRICULUM
                        </Typography>
                    </m.div>
                    <m.div variants={varFade().inDown}>
                        <Typography variant="h2" sx={{ mb: 3 }}>
                            Your journey from no code to data science
                        </Typography>
                    </m.div>
                    <m.div variants={varFade().inDown}>
                        <Typography
                            sx={{
                                color: isLight ? 'text.secondary' : 'text.primary',
                            }}
                        >
                            Choose a level to get started. You can change this anytime
                        </Typography>
                    </m.div>
                </Box>

                <Grid container spacing={5}>
                    {_homePlans.map((plan: any) => (
                        <Grid key={plan.LICENSE_TYPE} item xs={12} md={4}>
                            <m.div
                                variants={plan.LICENSE_TYPE === 'Standard Plus' ? varFade().inDown : varFade().inUp}
                            >
                                <PlanCard plan={plan} />
                            </m.div>
                        </Grid>
                    ))}
                </Grid>

                <m.div variants={varFade().in}>
                    <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
                        <m.div variants={varFade().inDown}>
                            <Typography variant="h3">School or Corporate</Typography>
                        </m.div>

                        <m.div variants={varFade().inDown}>
                            <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                                Please contact us with your details to know how we could deploy the curriculum at school level.
                            </Typography>
                        </m.div>

                        <m.div variants={varFade().inUp}>
                            <Button
                                size="large"
                                variant="outlined"
                                href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
                            >
                                Contact us
                            </Button>
                        </m.div>
                    </Box>
                </m.div>
            </Container>
        </RootStyle>
    );
}

// ----------------------------------------------------------------------

type PlanCardProps = {
    plan: {
        license: string;
        LICENSE_TYPE: string;
        commons: string[];
        options: string[];
        icons: string[];
        pricing: any;
        terms: any;
        courceLength: any;
        syllabus: any;
    };
};

function PlanCard({ plan }: PlanCardProps) {
    const { license, LICENSE_TYPE, icons, pricing, terms, courceLength, syllabus } = plan;

    const standard = license === 'Standard';
    const plus = license === 'Standard Plus';

    return (
        <Card
            sx={{
                p: 5,
                boxShadow: 0,
                ...(plus && {
                    boxShadow: (theme) => theme.customShadows.z24,
                }),
            }}
        >
            <Stack spacing={5}>
                <div>
                    <Typography variant="overline" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
                        {LICENSE_TYPE}
                    </Typography>
                    <Typography variant="h6">{license}</Typography>
                    {
                        pricing.caption ?
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="body1" fontWeight={700} sx={{ color: "#36bd79" }}>{pricing.price}</Typography>
                                <Typography sx={{ fontSize: ".8rem" }}>{pricing.caption}</Typography>
                            </Stack>
                            :
                            <Stack direction="row" alignItems="center">
                                <Typography variant="body1" fontWeight={700} sx={{ color: "#36bd79" }}>{pricing.price}</Typography>
                            </Stack>
                    }
                    <Stack sx={{ mt: 2 }}>
                        <ul>
                            {
                                terms.map((term: any, index: any) => {
                                    return terms.length > 1 ?
                                        (<li key={index}>{term}</li>)
                                        :
                                        <Typography variant="body1" key={index}>{term}</Typography>
                                })
                            }
                        </ul>
                    </Stack>
                </div>

                {standard ? (
                    <Image alt="package" src={icons[2]} sx={{ width: 40, height: 40 }} />
                ) : (
                    <Stack direction="row" spacing={1}>
                        {icons.map((icon) => (
                            <Image key={icon} alt="package" src={icon} sx={{ width: 123, height: 93 }} />
                        ))}
                    </Stack>
                )}

                <Stack spacing={2.5}>
                    {courceLength.map((info: any, index: any) => (
                        <Stack key={index} spacing={1.5} direction="row" alignItems="start">
                            <Iconify
                                icon={'eva:checkmark-fill'}
                                sx={{ color: '#00ab55', minWidth: 20, minHeight: 20 }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>{info}</Typography>
                        </Stack>
                    ))}

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    {syllabus.map((item: any, index: any) => {
                        return (
                            <Stack
                                spacing={1.5}
                                direction="row"
                                alignItems="center"
                                key={index}
                            >
                                <Iconify
                                    icon={'eva:checkmark-fill'}
                                    sx={{
                                        minWidth: 20, minHeight: 20,
                                        color: '#00ab55',
                                    }} />
                                <Typography variant="body2">{item}</Typography>
                            </Stack>
                        );
                    })}
                </Stack>

                <Stack direction="row" justifyContent="flex-end">
                    <Link
                        color="text.secondary"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                        href="https://material-ui.com/store/license/#i-standard-license"
                        sx={{ typography: 'body2', display: 'flex', alignItems: 'center' }}
                    >
                        Learn more <Iconify icon={'eva:chevron-right-fill'} width={20} height={20} />
                    </Link>
                </Stack>

                <Button
                    size="large"
                    fullWidth
                    variant='contained'
                    target="_blank"
                    rel="noopener"
                    href="https://material-ui.com/store/items/minimal-dashboard/"
                >
                    Start here
                </Button>
            </Stack>
        </Card>
    );
}
