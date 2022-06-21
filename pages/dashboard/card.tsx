import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Link, Stack, Button, Divider, Typography, Container, Grid } from '@mui/material';

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { varFade, MotionViewport } from '../../components/animate';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from '../../assets';
import Layout from '../../layouts';
import { LessonStatusCard } from '../../MyComponents/Card';
import { ChartColor } from '../../@types/cirrulumCard';

// CARD  CONTENTS
import { _homePlans } from '../../staticData';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.neutral,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}));

// ----------------------------------------------------------------------
Cards.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="main">{page}</Layout>;
};
type chartColor = "warning" | "error" | "success"
type color1 = "warning" | "error" | "info";


export default function Cards() {
    let deadline = 3;
    let color: color1 = 3 < 5 ? "error" : "warning"
    color = deadline === 7 ? "info" : "warning"
    let chartColor: ChartColor = color === "info" ? "success" : color

    const [dummyApiData, setDummyApiData] = useState( [
        {
            subscription: 'basic',
            title: "Introduction to Coding",
            subtitle: "Purchased",
            validity: "24th April, 2024",
            completed_lessons: 70,
            total_lessons: 100
        },
    ]);

    const [programNotStarted, setProgramNotStarted] = useState<string[]>([]);

    const updateCardData = () => {
        const titles: string[] = dummyApiData.map(item => item.title.toLowerCase());
        const licences: string[] = _homePlans.map(item => item.title.toLowerCase());

        let programNotYetStarted: string[] = [];
        licences.map(licence => !titles.includes(licence) ? programNotYetStarted.push(licence) : "");
        setProgramNotStarted(programNotYetStarted);
    }
    useEffect(() => {
        updateCardData();
    }, [dummyApiData]);
    

    return (
        <RootStyle>
            <Container component={MotionViewport}>
                <Grid container spacing={5}>
                    {
                        dummyApiData.map((data, index) => {
                            return (
                                <Grid item xs={12} md={4}  key={index}>
                                    <m.div variants={varFade().inUp}>
                                        <LessonStatusCard card={{
                                            subscription: data.subscription,
                                            title: data.title,
                                            subtitle: data.subtitle,
                                            validity: data.validity,
                                            completed_lessons: data.completed_lessons,
                                            total_lessons: data.total_lessons
                                        }} index={0} color={"info"} chartColor={"error"} />
                                    </m.div>
                                </Grid>
                            )
                        })
                    }
                    
                    {
                        _homePlans.map((plan,index)=>{
                            if(programNotStarted.includes(plan.title.toLowerCase()))
                            {
                                return(
                                    <Grid item xs={12} md={4} key={index}>
                                        <m.div variants={varFade().inUp}>
                                            <PlanCard plan={plan} />
                                        </m.div>
                                    </Grid>
                                )
                            }
                        })
                    }

                </Grid>
            </Container>
        </RootStyle>
    )
}


// curriculum card

type PlanCardProps = {
    plan: {
        title: string;
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
    const { title, LICENSE_TYPE, icons, pricing, terms, courceLength, syllabus } = plan;

    const standard = LICENSE_TYPE === 'Standard';
    const plus = LICENSE_TYPE === 'Standard Plus';

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
                    <Typography variant="h6">{title}</Typography>
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
                     Add this
                </Button>
            </Stack>
        </Card>
    );
}