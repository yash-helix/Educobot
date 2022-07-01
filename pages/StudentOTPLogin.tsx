import { useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
// next
import NextLink from "next/link";
import Router, { useRouter } from "next/router";

import useSettings from "../hooks/useSettings";

// @mui
import {
    Box,
    Tab,
    Tabs,
    Card,
    Table,
    Switch,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
    FormControlLabel,
    Typography,
    Stack,
    TextField,
    Menu,
    MenuItem,
    Grid,
    Chip,
    Alert,
    AlertTitle,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";

// @types
import { UserManager } from "../@types/user";

import data from "../_mock/data";
// layouts
import Layout from "../layouts";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import Scrollbar from "../components/Scrollbar";
import Label from "../components/Label";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";

import { LoadingButton, masonryClasses } from "@mui/lab";

import pellete from "../theme/palette";
import Image from "../components/Image";
import axios from "axios";
import dummyIMG from "../../../public/imgs/rabbitImg.png";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import uuidv4 from "../utils/uuidv4";
import LockIcon from "../assets/icon_Lock";
import Logo from "../components/Logo";
import useLocales from '../hooks/useLocales';
import MemoIcon_userGrey from "../assets/userIcons/UserGrey";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// StudentDashboard.getLayout = function getLayout(page: React.ReactElement) {
//     return <Layout>{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function StudentOTPLogin() {

    const {query} = useRouter();
    const router = useRouter();

    const { themeStretch } = useSettings();
    const theme = useTheme();
    const { push } = useRouter();
    const { allLang, currentLang, onChangeLang } = useLocales();
    
    const [closeAlert, setCloseAlert] = useState(true);
    const [closeAlertMsg, setCloseAlertMsg] = useState("");
    const [infoBar, setInfobar] = useState(true);

    const [student, setStudent] = useState({euName:"Guest"});

    const [MasterLessons, setMasterLessons] = useState([]);

    const token = localStorage.getItem("accessToken");
    

    const getStudentsData = async(userID)=>{
        try {
            const res = await axios.post("https://api.educobot.com/users/getUserDetails", {userID});
            if(res.data.data.length>0){
                setStudent(res.data.data[0])
            }
            else router.back();
        }
        catch (error) {
            router.back();
            console.log(error)
        }
    }

    useEffect(()=>{
        query?.id && getStudentsData(query.id);
    },[])
 


    return (
        <Page title="Teacher: Student Dashboard">
            <Container maxWidth={themeStretch ? false : "xl"}>

            {/* navbar*/}
            <Stack justifyContent={"space-between"} columnGap={1} p={1}
            sx={{flexDirection:{sm:"column", md:"row"}, justifyContent:{sm:"start", md:"space-between"}}}>
                    <Logo />

                    <Typography variant="h5" component={"h1"}>Welcome to Introduction to Coding, {student.euName}</Typography>

                    <Stack direction={"row"}  gap={2}>
                        <TextField
                            id="edu"
                            select
                            variant='standard'
                            value={currentLang.value}
                            InputProps={{ disableUnderline: true }}
                            onChange={(event) => onChangeLang(event.target.value)}
                        >
                            {allLang.map((lang) => (
                                <MenuItem key={lang.label} value={lang.value}>
                                    {lang.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <MemoIcon_userGrey width={"24px"} height={"24px"}/>
                </Stack>
            </Stack>

                <Box p={2}>
                    {/* otp snackbar */}
                    {infoBar &&
                        <Alert variant="filled" severity="info" sx={{ mt: "40px", lineHeight: "140px" }}>
                            <Typography variant="body1">Teacher has not unlocked any lessons.</Typography>
                        </Alert>
                    }
                </Box>

            </Container>
        </Page>
    );
}
