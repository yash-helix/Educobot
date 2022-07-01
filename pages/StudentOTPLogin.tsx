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
import MoreMenuButton from "../components/MoreMenuButton"
import useLocales from '../hooks/useLocales';
import MemoIcon_userGrey from "../assets/userIcons/UserGrey";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// StudentDashboard.getLayout = function getLayout(page: React.ReactElement) {
//     return <Layout>{page}</Layout>;
// };

// ----------------------------------------------------------------------


const dummyData = [
    {
        "lsLevel": 1,
        "Lessons": [
            {
                "lsID": "4bda4814-a2b1-4c4f-b102-eda5181bd0f8",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Guided",
                "lsLessonNo": 1,
                "lsName": "Bunny and Carrot",
                "lsDesc": "Bunny reaching out the carrot and returning home ",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Partly Guided",
                "lsSkillTag2": "Sequencing",
                "lsSkillTag3": "Logic",
                "lsWeek": 1,
                "createdBy": "",
                "createdOn": "",
                "status": "C"
            },
            {
                "lsID": "e0c38e50-cbb3-455f-ae16-d737fc624b24",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Partly Guided",
                "lsLessonNo": 2,
                "lsName": "Animal Farm",
                "lsDesc": "",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Help",
                "lsSkillTag2": "Logic",
                "lsSkillTag3": "Wait Time",
                "lsWeek": 1,
                "createdBy": "",
                "createdOn": "",
                "status": "O"
            },
            {
                "lsID": "00351ca6-78bd-479a-94d6-e40a9cc86313",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Practice",
                "lsLessonNo": 3,
                "lsName": "Dog eats bone",
                "lsDesc": "",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Guided",
                "lsSkillTag2": "Movement",
                "lsSkillTag3": "Logic",
                "lsWeek": 2,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "5deef5f3-1412-4fbc-bc0c-12d0baa9184f",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Guided",
                "lsLessonNo": 4,
                "lsName": "Snack time - Snake ",
                "lsDesc": "Directing the snake to different food and bringing it home",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Movement",
                "lsSkillTag3": "Logic",
                "lsWeek": 2,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "62a91c84-7cdd-4a94-bcc1-20d569ad9fdd",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Guided",
                "lsLessonNo": 5,
                "lsName": "Trash Can",
                "lsDesc": "Directing trash to different trash bins",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Partly Guided",
                "lsSkillTag2": "Logic",
                "lsSkillTag3": "Condition",
                "lsWeek": 3,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "d51b6016-7b0b-4da7-826e-a70cbcc8b941",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Guided",
                "lsLessonNo": 7,
                "lsName": "Fill in the birds",
                "lsDesc": "Using variables to put in the right number of bird in the blank",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Test",
                "lsSkillTag2": "Arithmatic",
                "lsSkillTag3": "Logic",
                "lsWeek": 4,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "8bedf833-bde2-433c-9930-f9f8947f2631",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Guided",
                "lsLessonNo": 8,
                "lsName": "Master chef -Pizza",
                "lsDesc": "Using multiple variables to store fractions",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Arithmatic",
                "lsSkillTag3": "Logic",
                "lsWeek": 4,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "9214a640-582c-40c2-8e10-7d66fd915206",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 1,
                "lsType": "Test",
                "lsLessonNo": 9,
                "lsName": "Test - Perfect Salad",
                "lsDesc": "Use  variables and sequential arrangements to make a perfect salad",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Partly Guided",
                "lsSkillTag2": "",
                "lsSkillTag3": "",
                "lsWeek": 5,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            }
        ]
    },
    {
        "lsLevel": 2,
        "Lessons": [
            {
                "lsID": "b98e117d-e9bf-46b4-84e7-53edd5f489cc",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 2,
                "lsType": "Guided",
                "lsLessonNo": 10,
                "lsName": "Magic show",
                "lsDesc": "Magician performing magic",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Sequencing",
                "lsSkillTag3": "Sequencing",
                "lsWeek": 5,
                "createdBy": "",
                "createdOn": "",
                "status": "C"
            },
            {
                "lsID": "68565163-4f73-4699-a6bf-7b133359bc5b",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 2,
                "lsType": "Guided",
                "lsLessonNo": 11,
                "lsName": "Where am I",
                "lsDesc": "Robbers will be in different positions in the output screen. Police has to revealit's coordinates",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "",
                "lsSkillTag3": "",
                "lsWeek": 6,
                "createdBy": "",
                "createdOn": "",
                "status": "O"
            },
            {
                "lsID": "28877b96-f243-499a-850c-e1c9a77af333",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 2,
                "lsType": "Guided",
                "lsLessonNo": 12,
                "lsName": "Vehicle rush",
                "lsDesc": "Park the vehicles in front of their respective parkings",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Coordinates",
                "lsSkillTag3": "",
                "lsWeek": 6,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "956dfe60-ed8a-45a4-8fac-dd3d72137944",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 2,
                "lsType": "Guided",
                "lsLessonNo": 13,
                "lsName": "Wonders of the world",
                "lsDesc": "Place wonders of the world  on the country where it belongs to using coordinates",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Sprite positioning",
                "lsSkillTag3": "",
                "lsWeek": 7,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            },
            {
                "lsID": "cf1b162a-4bba-40fe-985c-e99b6d485b5c",
                "lsCourse": "Introduction to Coding",
                "lsLevel": 2,
                "lsType": "Test",
                "lsLessonNo": 14,
                "lsName": "Plants in our garden",
                "lsDesc": "Program water management system for garden for optimum use of water",
                "lsImgUrl": "",
                "lsThumnail": "",
                "lsLanguages": "",
                "lsStd": "3",
                "lsFilePath": "Coordinates",
                "lsSkillTag1": "Practice",
                "lsSkillTag2": "Variables",
                "lsSkillTag3": "Wait time",
                "lsWeek": 7,
                "createdBy": "",
                "createdOn": "",
                "status": "L"
            }
        ]
    }
]




export default function StudentOTPLogin() {

    const {query} = useRouter();
    const router = useRouter();

    const { themeStretch } = useSettings();
    const theme = useTheme();
    const { allLang, currentLang, onChangeLang } = useLocales();
    
    const [closeAlert, setCloseAlert] = useState(true);
    const [closeAlertMsg, setCloseAlertMsg] = useState("");
    const [infoBar, setInfobar] = useState(true);

    const [student, setStudent] = useState({euName:"Guest"});

    const [MasterLessons, setMasterLessons] = useState([]);
    const [LevelArray, SetLevelArray] = useState([]);

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


    const getExpired = async(allLessons) => {
        allLessons = allLessons.map(lesson => {
            if(lesson.lsID == "4bda4814-a2b1-4c4f-b102-eda5181bd0f8"){
                return {...lesson, isExpired:true}
            }
            else return lesson
        })
        return allLessons
    }

    const getActive = (allLessons) => {
        const expiredIndex =  allLessons.map(l => l.isExpired).lastIndexOf(true);
        allLessons[expiredIndex + 1]['isActive'] = true
        return allLessons;
    }

    const getLessonsData = async() => {
        let arr = [];
        dummyData.map(obj => obj.Lessons.map(lesson => arr.push(lesson)))

        let allLessons = await getExpired(arr);
        allLessons = await getActive(allLessons);

        allLessons = allLessons.map(lesson=>{
            if(!lesson.isActive && !lesson.isExpired)
                return {...lesson, inActive:true}
            else return lesson
        })

        setMasterLessons(allLessons);
    }

    const mapMasterLessonsByLevels = () => {
        SetLevelArray([]);

        MasterLessons.length > 0 &&
        MasterLessons.map((les, index) => {
                const levelArr = MasterLessons.map(lesson => lesson?.lsLevel == index+1 && lesson).filter(item => item != false)
                if (levelArr.length > 0)
                    SetLevelArray(prev => [...prev, levelArr]);
            })
    }

    useEffect(()=>{
        query?.id && getStudentsData(query.id);
        getLessonsData();
    },[])

    useEffect(() => {
      MasterLessons.length>0 && mapMasterLessonsByLevels();
    }, [MasterLessons])
    
 


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

                    {/* lesson cards */}
                    {
                        LevelArray.map((level, index) => {
                            return <LessonCard index={index} level={level} userId={query.id}/>
                        })
                    }
                </Box>

            </Container>
        </Page>
    );
}




// CARD COMPONENT
type LessonCardProps = {
    index: Number,
    level: any
    userId : any
}

export const LessonCard = ({index, level, userId} : LessonCardProps) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    let tags = ["tag1", "tag2", "tag3", "tag4"];

    const openLesson = (lsID) => {
        try {
            let blocklyLessons = ["4bda4814-a2b1-4c4f-b102-eda5181bd0f8", "1d749e84-1155-4269-93ab-550ee7aabd4a"];
            let lessonType = blocklyLessons.includes(lsID) ? "blockly" : "game";

            let link = userId && `${process.env.webAppUrl}/${lessonType}/${lsID}?user_id=${userId}`;

            if(link && typeof window != 'undefined') window.open(link)
        }
        catch (error) {
            console.log(error)
        }
    }


    const getButtonsJSX = (lesson) => {
        // active or opened
        if(lesson?.isActive){
            return <>
                <Button fullWidth variant="contained" color="error" sx={{ marginY: "10px" }} 
                onClick={()=>openLesson(lesson.lsID)}>
                    Start Lesson
                </Button>
            </>
        }
        else if(lesson.isExpired) {
            return <>
                <Button fullWidth variant="outlined" color="error" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lesson.lsID)}>
                    Start Lesson
                </Button>
            </>
        }
        else {
            return <>
                <Button fullWidth variant="contained" color="inherit" disabled sx={{ marginY: "10px" }}>
                    <LockIcon width="24px" height="24px" fill1="#fff" fill2="#fff"/>
                </Button>
            </>
        }
    }

    return(
        <Box mt={"40px"}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems="center">
                <Typography variant="h6" component={"h1"} paddingLeft={1}>
                    Level {Number(index) + 1}
                </Typography>
                <MoreMenuButton/>
            </Stack>

            <Grid container mt="20px">
                {
                    level.map((lesson, i) => {
                        const circleRounded = lesson.lsLessonNo <= 9 ? "50%" : "30px";
                        const circleSize = lesson.lsLessonNo <= 9 ? "28px" : "30px";

                        return <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`${lesson?.lsID}`}>
                        <Card
                            sx={{
                                py: 2.5,
                                px: 1,
                                my: 2,
                                mx: 1,
                                maxWidth: "350px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: isLight && pellete.light.grey[0],
                                ...(lesson?.isExpired && {backgroundColor: isLight && pellete.light.grey[0]}),
                                ...((lesson?.isActive || lesson.inActive) && {background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)"}),
                                boxShadow: '0px 4px 16px 0px rgba(51, 102, 255, 0.22)',
                            }}>

                            <Stack spacing={1.5} padding={1}>
                                {/* TITLE & INDEX */}
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        sx={{
                                            color: pellete.light.grey[100],
                                            backgroundColor: pellete.light.grey[900],
                                            minWidth: circleSize,
                                            minHeight: circleSize,
                                            padding: "1px 7px",
                                            border: "1.5px solid #F9FAFB",
                                            borderRadius: circleRounded,
                                            display: "grid",
                                            placeItems: "center"
                                        }}
                                    >
                                        {lesson.lsLessonNo}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: ".8rem",
                                            color: (lesson.isActive | lesson.inActive) && pellete.light.grey[100]
                                        }}
                                    >
                                        {lesson?.lsName}
                                    </Typography>
                                </Stack>

                                {/* TAGS */}
                                <Grid container gap={1}>
                                    {tags.map((tag, i) => (
                                        <Grid item key={i}>
                                            {lesson[`lsSkillTag${i + 1}`] &&
                                                <Chip
                                                    key={i}
                                                    size="small"
                                                    label={lesson[`lsSkillTag${i + 1}`]}
                                                    sx={{
                                                        color: isLight
                                                            ? pellete.light.grey[600]
                                                            : pellete.light.grey[400],
                                                        backgroundColor: isLight
                                                            ? pellete.light.grey[500_16]
                                                            : pellete.light.grey[700],
                                                        borderRadius: "10px",
                                                        ...((lesson.isActive | lesson.inActive) && {
                                                            backgroundColor: pellete.light.grey[300],
                                                            color: pellete.light.grey[800],
                                                        }),
                                                    }}
                                                />
                                            }
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                            {
                                lesson.lsCourse !== "Python Basic" &&
                                <Image alt="image" src={`https://app.educobot.com/liveLessons/thumbNails/${lesson.lsName}.png`} borderRadius={"8px"} />
                            }

                            <Stack gap={1} padding={1}>
                                {/* DESCRIPTION */}
                                <Typography sx={{ color: (lesson.isActive || lesson.inActive) ? "#fff" : pellete.light.grey[500] }}>
                                    {lesson?.lsDesc}
                                </Typography>

                                    {/* bottom buttons */}
                                    <Stack direction={"row"} justifyContent="space-around" gap={1}>
                                        {getButtonsJSX(lesson)}
                                    </Stack>

                                </Stack>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    )
}
