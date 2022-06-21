import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Radio, Container, CardHeader, Typography, RadioGroup, FormControlLabel, TextField, MenuItem, Button, Link } from '@mui/material';
// hooks
import useLocales from '../hooks/useLocales';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import Image from '../components/Image';
import TextIconLabel from '../components/TextIconLabel';
import { Trans } from 'react-i18next';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoMultiLanguage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoMultiLanguage() {
    const { allLang, currentLang, translate, onChangeLang } = useLocales();
    const list = [{
        translation: "Hello <1>World</1>",
        content: "Hello <a href='#'>World</a>"
    },
    { translation: "A <1>B</1>", content: "A <a href='#'>B</a>" }]

    return (
        <Page title="Components: Multi Language">

            <RootStyle>
                <Container>
                    <Stack spacing={5}>
                        <Card>
                            <CardHeader title="Flexible" />
                            <Box sx={{ p: 3 }}>
                                {/* <RadioGroup
                                    row
                                    value={currentLang.value}
                                    onChange={(event) => onChangeLang(event.target.value)}
                                >
                                    {allLang.map((lang) => (
                                        <FormControlLabel
                                            key={lang.label}
                                            value={lang.value}
                                            label={lang.label}
                                            control={<Radio />}
                                        />
                                    ))}
                                </RadioGroup> */}
                                <TextField
                                    id="edu"
                                    select
                                    label="Language"
                                    defaultValue={""}
                                    onChange={(event) => onChangeLang(event.target.value)}
                                    helperText="Please select your currency"
                                >
                                    {allLang.map((lang) => (
                                        <MenuItem key={lang.label} value={lang.value}>
                                            {lang.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextIconLabel
                                    icon={
                                        <Image
                                            disabledEffect
                                            alt={currentLang.label}
                                            src={currentLang.icon}
                                            sx={{ mr: 1 }}
                                        />
                                    }
                                    value={translate('demo.title')}
                                    sx={{ typography: 'h2', my: 3 }}
                                />

                                <Typography>{translate('demo.introduction')}</Typography>
                                {
                                    list.map((item, index) => (
                                        <Trans
                                            key={index}
                                            i18nKey={item.translation}
                                            defaults={item.translation}
                                            components={[<a href="#" key={index}></a>]}
                                        ></Trans>
                                    ))
                                }
                                <br />
                                <Button
                                    size="large"
                                    variant="outlined"
                                    href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
                                >
                                    {translate('common.contactUs')}
                                </Button>

                                <Typography variant="h6" align="center" sx={{ mt: 3, cursor: 'pointer' }}>
                                    {translate('common.go')}&nbsp;
                                    <Link underline="none" color="primary">
                                        {translate('common.back')}
                                    </Link>
                                </Typography>
                            </Box>
                        </Card>

                    </Stack>
                </Container>
            </RootStyle>
        </Page >
    );
}
