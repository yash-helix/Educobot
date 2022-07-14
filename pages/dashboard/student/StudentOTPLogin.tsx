import { useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
// next
import NextLink from "next/link";
import Router, { useRouter } from "next/router";

import useSettings from "../../../hooks/useSettings";

// @mui
import {
    Box,
    Card,
    Button,
    Container,
    Typography,
    Stack,
    TextField,
    MenuItem,
    Grid,
    Chip,
    Alert,
} from "@mui/material";

// components
import Page from "../../../components/Page";

import pellete from "../../../theme/palette";
import Image from "../../../components/Image";
import axios from "axios";
import LockIcon from "../../../assets/icon_Lock";
import Logo from "../../../components/Logo";
import MoreMenuButton from "../../../components/MoreMenuButton"
import useLocales from '../../../hooks/useLocales';
import MemoIcon_userGrey from "../../../assets/userIcons/UserGrey";


// python json
import {pythonJson} from "../../../python";

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

    const { allLang, currentLang, onChangeLang } = useLocales();

    const [infoBar, setInfobar] = useState(null);

    const [student, setStudent] = useState(null);

    const [MasterLessons, setMasterLessons] = useState([]);
    const [LevelArray, SetLevelArray] = useState([]);

    const token = localStorage.getItem("accessToken");
    

    const getStudentsData = async(userID)=>{
        try {
            const res = await axios.post("https://api.educobot.com/users/getUserDetails", {userID});
            if(res.data.data.length>0){
                setStudent(res.data.data[0])
                localStorage.setItem("userID", res.data.data[0]?.userID)
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
            if(lesson?.edStatus === "X"){
                return {...lesson, isActive:true}
            }
            else return {...lesson, isExpired:true}
        })
        return allLessons
    }


    const getLessonsData = async(otp) => {
        try {
            const obj = {
                "rollNo":student.euRollNo,
                "otp":otp
            }
            const res = await axios.post("https://api.educobot.com/sessionRoute/getLessonsByPIN4Students", obj);
            if(res.data.length>0){
                let allLessons = await getExpired(res.data);
                setMasterLessons(allLessons);
                
                setInfobar({open:false, msg:""})
            }
            else {
                setMasterLessons([]);
                setInfobar({open:true, msg:res?.data?.message || 'Teacher has not unlocked any lessons.'})
            }
        }
        catch (error) {
            setInfobar({open:true, msg:"Unexpected Error Occurred."})
            setMasterLessons([]);
        }
    }



    const mapMasterLessonsByLevels = () => {
        SetLevelArray([]);

        if (MasterLessons.length > 0) {
            // grouping
            const groupedByCategoryArr = MasterLessons.reduce((group, lesson) => {
                const { lsLevel } = lesson;
                group[lsLevel] = group[lsLevel] ?? [];
                group[lsLevel].push(lesson);
                return group;
            }, {})


            // performing operations on grouped levels
            Object.keys(groupedByCategoryArr).map(levelNo => {
                if (groupedByCategoryArr[levelNo].length > 0) {
                    const firstActiveLessoninLevel = groupedByCategoryArr[levelNo].map(lessonObj => lessonObj?.isActive).indexOf(true);

                    let levelArr = [];
                    // if (firstActiveLessoninLevel >= 0) {
                        // to make lesson in all levels accessible
                        levelArr = groupedByCategoryArr[levelNo].map((lesson, i) => {
                            console.log(lesson)
                            if (i > firstActiveLessoninLevel && lesson?.edStatus !== "C")
                                return { ...lesson, isActive: false, inActive: true }
                            else
                                return { ...lesson }
                        })
                        SetLevelArray(prev => [...prev, levelArr]);
                    // }
                    // else
                    //     SetLevelArray(prev => [...prev, levelArr]);
                }
            })

        }
    }


    const postEvalData = async(lesson) => {
        const body = {
            "userID": lesson.edUID,
            "edType": lesson.edType,
            "std": lesson.edStd,
            "div": lesson.edRollNo,
            "status": lesson.edStatus,
            "lessonID": lesson.lsID,
            "rollNo":lesson.edRollNo,
            "pin": lesson.edPIN,
            "schoolID": lesson.edSchoolID
        }
        const res = await axios.post("https://api.educobot.com/users/postEvalData", body);
        console.log(res)
        if(res.data?.msg!=="") return true
        else return false
    }



    useEffect(()=>{
        if(query?.id && query?.otp){
            getStudentsData(query.id);
        }
    }, [])


    useEffect(()=>{
        getLessonsData(query?.otp)
    },[student])


    // mapping lessons by levels
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

                    <Typography variant="h5" component={"h1"}>Welcome to Introduction to Coding, {student?.euName}</Typography>

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
                    {infoBar?.open &&
                        <Alert variant="filled" severity="info" sx={{ mt: "40px", lineHeight: "140px" }}>
                            <Typography variant="body1">{infoBar?.msg}</Typography>
                        </Alert>
                    }

                    {/* lesson cards */}
                    {
                        LevelArray.map((level, i) => {
                            return <LessonCard key={i} levelNo={level[i]?.lsLevel} level={level} userId={query.id} 
                            postEvalData={postEvalData} CourseOTP={query?.otp}/>
                        })
                    }
                </Box>

            </Container>
        </Page>
    );
}




// CARD COMPONENT
type LessonCardProps = {
    levelNo: any,
    level: any
    userId : any
    postEvalData : (lessonID) => Promise<boolean>
    CourseOTP:any
}

export const LessonCard = ({levelNo, level, userId, postEvalData, CourseOTP} : LessonCardProps) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    let tags = ["tag1", "tag2", "tag3", "tag4"];


    const getPythonLessonTypefromId = (course:any) => {
        const type = course['lsType']

        let lessonType = "";
        switch (type) {
            case "Python Quiz based":
                return lessonType = "quiz"
            case "Python Open Editor":
                return lessonType = "editor"
            case "Python Predictive":
                return lessonType = "script"
            default:
                return lessonType
        }
    }
    

    const openLesson = async (course: any) => {
        try {
            const userId = localStorage.getItem("userID");
            
            let link = userId ?
            `${process.env.webAppUrl}/game/${course?.lsID}?user_id=${userId}&otp=${CourseOTP}` :
            "#";
            
            if(course.lsCourse == "Python Basic")
            {
                const lessonType = getPythonLessonTypefromId(course);
                link = lessonType !== "" ?
                `${process.env.webAppUrl}/${lessonType}/${course.lsID}?user_id=${userId}&otp=${CourseOTP}`:
                "#"
                
                link = lessonType=="quiz" ? `${process.env.dashboardUrl}/dashboard/quiz/${course.lsID}?user_id=${userId}&otp=${CourseOTP}` : link
            }
            (link && typeof window != 'undefined') && window.open(link)
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
                onClick={()=>openLesson(lesson)}>
                    Start Lesson
                </Button>
            </>
        }
        else if(lesson.isExpired) {
            return <>
                <Button fullWidth variant="outlined" color="error" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lesson)}>
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
                    Level {levelNo}
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
                                backgroundColor: pellete.light.grey[0],
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
                                            color: (lesson.isActive | lesson.inActive) ? pellete.light.grey[100] : "#212B36"
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
                                                        color: "#637381",
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
