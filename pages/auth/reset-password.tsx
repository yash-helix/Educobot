import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from "../../layouts"
// components
import Page from '../../components/Page';
// sections
import SetNewPasswordForm from '../../MyComponents/SetNewPasswordForm';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

SetNewPassword.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SetNewPassword() {
    const [email, setEmail] = useState('');

    const [sent, setSent] = useState(false);

    return (
        <Page title="Reset Password" sx={{ height: 1 }}>
            <RootStyle>
                <Container>
                    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                        {!sent ? (
                            <>
                                <Typography variant="h3" paragraph>
                                    Reset your password
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                                    Password is case sensitive, should be min 6 characters and contain special characters.
                                </Typography>

                                <SetNewPasswordForm/>

                                <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                                    eduCOBOT&nbsp;
                                    <Link underline="always" color="text.primary" href="#">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link underline="always" color="text.primary" href="#">
                                        Privacy Policy
                                    </Link>
                                    .
                                </Typography>
                            </>
                        ) : (
                            <Box sx={{ textAlign: 'center' }}>
                                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                                <Typography variant="h3" gutterBottom>
                                    Request sent successfully
                                </Typography>
                                <Typography>
                                    We have sent a confirmation email to &nbsp;
                                    <strong>{email}</strong>
                                    <br />
                                    Please check your email.
                                </Typography>

                                <NextLink href={PATH_AUTH.login} passHref>
                                    <Button size="large" variant="contained" sx={{ mt: 5 }}>
                                        Back
                                    </Button>
                                </NextLink>
                            </Box>
                        )}
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    );
}
