import { useEffect, useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
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
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useTabs from "../../../hooks/useTabs";
import useSettings from "../../../hooks/useSettings";
import useTable, { getComparator, emptyRows } from "../../../hooks/useTable";
// @types
import { UserManager } from "../../../@types/user";

import data from "../../../_mock/data";
// layouts
import Layout from "../../../layouts";
// components
import Page from "../../../components/Page";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import Label from "../../../components/Label";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedActions,
} from "../../../components/table";
// sections
import {
    StudentTableToolbar,
    StudentTableRow,
} from "../../../sections/@dashboard/saasstudent/list";

import {
    FormProvider,
    RHFSelect,
    RHFTextField,
} from "../../../components/hook-form";

import { LoadingButton, masonryClasses } from "@mui/lab";

import pellete from "../../../theme/palette";
import Image from "../../../components/Image";
import axios from "axios";
import dummyIMG from "../../../public/imgs/rabbitImg.png";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import uuidv4 from "../../../utils/uuidv4";
import LockIcon from "../../../assets/icon_Lock";

// python json
// import {pythonJson} from "../../../python";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

Curriculum2_1.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const CLASS_DATA = ["5", "6", "7", "8"];
const DIVISION_DATA = ["A", "B", "C", "D"];
const CourseNames = ["Introduction To Coding", "Python Basic", "Certificate in Data Science"];
const expiredLessons = [
    { spLessonID: "4bda4814-a2b1-4c4f-b102-eda5181bd0f8", otp: 3245 },
    { spLessonID: "e0c38e50-cbb3-455f-ae16-d737fc624b24", otp: 1234 }
];
let expired_Lessons = [];
let open_lessons = [];

export default function Curriculum2_1() {
    const { themeStretch } = useSettings();
    const theme = useTheme();
    const { push } = useRouter();
    
    
    const [closeAlert, setCloseAlert] = useState(true);
    const [closeAlertMsg, setCloseAlertMsg] = useState("");
    const [OTPsnackbar, setOTPsnackbar] = useState(false);
    
    const [OpenTitleDDL, setOpenTitleDDL] = useState<null | HTMLElement>(null);
    const [classValue, setClassValue] = useState("5");
    const [divisionValue, setDivisionValue] = useState("Division");
    const [CourseName, setCourseName] = useState("Introduction To Coding");

    const [MasterLessons, setMasterLessons] = useState([]);
    const [LevelArray, SetLevelArray] = useState([]);

    const [CourseOTP, setCourseOTP] = useState(undefined);

    const token = localStorage.getItem("accessToken");
    
    
    const getExpired = async (allLessons) => {
        const token = localStorage.getItem("accessToken");
        const schoolID = localStorage.getItem("schoolID");
        
        if (classValue !== "Class" && divisionValue !== "Division") {
            try {
                const response = await axios.post("https://api.educobot.com/sessionRoute/getClosedPIN",
                { "std": classValue, "div": divisionValue, "course": CourseName, "schoolID": schoolID },
                {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                
                expired_Lessons = response.data.map(obj => obj.sdLesson);
                
                // expired_Lessons = [];
                // response.data.map(obj => obj.Lessons.map(lesson=>lesson.sdLesson)).map(arr => arr.map(id => expired_Lessons.push(id)));
                
                expired_Lessons = Array.from(new Set(expired_Lessons));
                
                for (let i = 0; i < expired_Lessons.length; i++) {
                    for (let j = 0; j < allLessons.length; j++) {
                        if (expired_Lessons[i] == allLessons[j].lsID) {
                            allLessons[j]['isExpired'] = true;
                        }
                    }
                }
                return allLessons;
            }
            catch (error) {
                console.log(error)
                return allLessons;
            }
        }
    }
    
    
    const getOpenLessons = async (allLessons) => {
        const schoolID = localStorage.getItem("schoolID");
        
        if (classValue !== "Class" && divisionValue !== "Division" && schoolID) {
            let body = { "std": classValue, "div": divisionValue, "course": CourseName, "schoolID": schoolID }
            
            try {
                const res = await axios.post("https://api.educobot.com/sessionRoute/getOpenPIN", body,
                {
                    headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${token}` }
                });
                
                // set otp if available
                if(res.data[0]?.spPIN){
                    setCourseOTP(res.data[0]?.spPIN)
                }

                if(res.data[0]?.Lessons.length > 0)
                {
                    let openLessons = res.data[0]?.Lessons.map(obj => obj?.sdLesson);
                    open_lessons = openLessons;
                    
                    for (let i = 0; i < openLessons.length; i++) {
                        for (let j = 0; j < allLessons.length; j++) {
                            if (openLessons[i] == allLessons[j].lsID) {
                                allLessons[j]['isOpenAndActive'] = true;
                            }
                            else {
                                if (allLessons[j]?.isActive || allLessons[j]?.isExpired)
                                allLessons[j]['isLocked'] = true;
                            }
                        }
                    }

                    // to make the lesson after the latest opened lesson accessible
                    const lastActiveAndOpenLesson = allLessons.map(l => l.isOpenAndActive).lastIndexOf(true);
                    allLessons[lastActiveAndOpenLesson+1]['nextLessonToUnlock'] = true
                    
                    return allLessons;
                }
                else {
                    // setCourseOTP(undefined);
                    for (let j = 0; j < allLessons.length; j++) {
                        if (allLessons[j]?.isActive || allLessons[j]?.isExpired)
                        allLessons[j]['isLocked'] = true;
                    }
                    return allLessons;
                }
            }
            catch (error) {
                console.log(error)
                return allLessons;
            }
        }
    }
    

    const getAllLessonData1 = async () => {
        // reseting all
        expired_Lessons = [];
        open_lessons = [];
        setCourseOTP(undefined);
        
        let body = { courseName: CourseName }
        
        if (divisionValue !== "Division") {
            await axios.post("https://api.educobot.com/lessonsRoute/getLessonsByCourse", body,
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(async (res) => {
                if (res.status === 200) {
                    let allLessonsArr = res.data.map(obj => obj.Lessons);
                    const allLessons = allLessonsArr.flatMap(obj => obj);
                    
                    let updatedLessons = await getExpired(allLessons);
                    updatedLessons = await getOpenLessons(updatedLessons);
                    // updatedLessons = await getMax(updatedLessons);
                    
                    setMasterLessons([...updatedLessons]);
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    
    
    const getAllLessonData = async () => {
        let body = { courseName: CourseName }
        await axios.post("https://api.educobot.com/lessonsRoute/getLessonsByCourse", body,
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(async (res) => {
                if (res.status === 200) {
                    let allLessonsArr = res.data.map(obj => obj.Lessons);
                    const allLessons = allLessonsArr.flatMap(obj => obj);

                    setMasterLessons([...allLessons]);
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        

    const mapMasterLessonsByLevels = () => {
        SetLevelArray([]);
        MasterLessons.length > 0 &&
            MasterLessons.map((les, index) => {
                const levelArr = MasterLessons.map(lesson => lesson?.lsLevel == index + 1 && lesson).filter(item => item != false)
                if (levelArr.length > 0) {
                    SetLevelArray(prev => [...prev, levelArr]);
                }
            })
    }

    
    // generate otp
    const generateOTP = async () => {
        if (CLASS_DATA.includes(classValue) && DIVISION_DATA.includes(divisionValue)) {
            let schoolID = localStorage.getItem("schoolID");

            let body = {
                "std": `${classValue}`,
                "div": `${divisionValue}`,
                "course": `${CourseName}`,
                "schoolID": schoolID
            }
            try {
                const res = await axios.post("https://api.educobot.com/sessionRoute/generateOTP",
                body,
                { headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
                
                setCourseOTP(res.data?.otp);
                
                setOTPsnackbar(true) //info snackbar
                setTimeout(() => {
                    setOTPsnackbar(false);
                }, 15000);
            }
            catch (err) {
                setCloseAlertMsg("Unexpected Error Occurred");
                setCloseAlert(false);
            }
        }
        else {
            setCloseAlertMsg("Please select the class and division");
            setCloseAlert(false);
        }
    }
    

    // unlock the lesson
    const Unlock = async (lsID: any) => {
        try {
            const body = {
                "userID": localStorage.getItem("userID"),
                "otp": CourseOTP,
                "std": classValue,
                "div": divisionValue,
                "course": CourseName,
                "lessonID": lsID,
                "operation": "I",
                "schoolID": localStorage.getItem("schoolID")
            }
            const res = await axios.post("https://api.educobot.com/sessionRoute/postOTPLesson", body)
            getAllLessonData1();
        }
        catch (error) {
            console.log("Error in Unlocking Lesson", error)
        }
    }
    

    // division value
    useEffect(() => {
        const div = localStorage.getItem("div");
        if(div && div!==""){
            setDivisionValue(div)
        }
    }, [])
    
    
    useEffect(() => {
        getAllLessonData();
    }, [CourseName]);
    
    
    
    useEffect(() => {
        getAllLessonData1();
    }, [divisionValue, CourseName]);
    
    
    
    useEffect(() => {
        mapMasterLessonsByLevels();
    }, [MasterLessons]);
    
    
    // on error occurred
    useEffect(() => {
        window.scrollTo(0, 0);
        let tm = setTimeout(() => {
            setCloseAlert(true);
        }, 4000);
        
        closeAlert && setCloseAlertMsg("");

        return () => clearTimeout(tm);
    }, [closeAlert])


    // opening of dropdown
    const handleOpenTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenTitleDDL(event.currentTarget);
    };

    // on closing the dropdowns
    const handleCloseClass = (event: any) => {
        event.target.value !== classValue ?
            (setClassValue(event.target.value), setDivisionValue("Division")) : ""
    };

    const handleCloseDivision = (event: any) => {
        if(event.target.value !== divisionValue) {
            setDivisionValue(event.target.value)
            localStorage.setItem("div", event.target.value)
        }
        getAllLessonData();
    };

    const handleCloseTitleDDL = (event: any, title: string) => {
        setCourseName(title)
        setOpenTitleDDL(null)
    };


    return (
        <Page title="Teacher: Curriculum2">
            {/* error alert */}
            <Alert
                variant="filled"
                severity="error"
                sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    alignItems: "center",
                    display: closeAlert == true ? "none" : "flex",
                    mb: 1,
                    zIndex: 1,
                }}
                action={
                    <Button
                        color="inherit"
                        size="small"
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            border: (theme) =>
                                `1px solid ${alpha(theme.palette.common.white, 0.48)}`,
                        }}
                        onClick={() => {
                            setCloseAlert(true);
                            setCloseAlertMsg("");
                        }}
                    >
                        Close
                    </Button>
                }
            >
                <AlertTitle>{"Error"}</AlertTitle>
                {closeAlertMsg}
            </Alert>

            <Container maxWidth={themeStretch ? false : "xl"}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent={"space-between"}
                    alignItems={{ xs: "start", md: "center" }}
                >
                    {/* CourseName */}
                    <Stack
                        width={{ xs: "100%", sm: "auto" }}
                        direction={{ xs: "column", sm: "row" }}
                    // spacing={2}
                    >
                        <Button color="inherit" onClick={handleOpenTitle}>
                            <Typography variant="h5" component={"h1"}>
                                {CourseName}
                            </Typography>
                            <Iconify
                                icon={
                                    OpenTitleDDL
                                        ? "eva:arrow-ios-upward-fill"
                                        : "eva:arrow-ios-downward-fill"
                                }
                                sx={{ ml: 0.6, width: 16, height: 16 }}
                            />
                        </Button>
                        <Menu
                            keepMounted
                            id="simple-menu"
                            anchorEl={OpenTitleDDL}
                            onClose={(e) => handleCloseTitleDDL(e, CourseName)}
                            open={Boolean(OpenTitleDDL)}
                        >
                            {CourseNames.map((title) => (
                                <MenuItem
                                    key={title}
                                    onClick={(e) => handleCloseTitleDDL(e, title)}
                                >
                                    {title}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Stack>

                    {/* class, division, otp, button */}
                    <Stack
                        width={{ xs: "100%", sm: "auto" }}
                        direction={{ xs: "column", sm: "row" }}
                        alignItems="center"
                        spacing={2}
                    >
                        <TextField
                            select
                            size="small"
                            sx={{ width: "120px", height: "40px" }}
                            label="Class"
                            value={classValue}
                            onChange={handleCloseClass}
                        >
                            {CLASS_DATA.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            size="small"
                            sx={{ width: "120px", height: "40px" }}
                            label={"Division"}
                            value={divisionValue}
                            onChange={handleCloseDivision}
                        >
                            {DIVISION_DATA.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* otp container */}
                        {
                            CourseOTP &&
                            <Typography variant="h4" component={"h1"}>
                                {CourseOTP}
                            </Typography>
                        }

                        {/* otp button */}
                        {
                            <Button variant="contained" color="primary" onClick={generateOTP} disabled={(CourseOTP!=undefined && CourseOTP)}>
                                Generate OTP
                            </Button>
                        }
                    </Stack>
                </Stack>

                {/* otp snackbar */}
                {OTPsnackbar &&
                    <Alert variant="filled" severity="info" sx={{ mt: "40px", lineHeight: "140px" }}>
                        <Typography variant="body1">During this OTP session, you cannot lock a lesson once it is unlocked.</Typography>
                        <Typography variant="body2">Click the red button below to unlock new lessons in a sequential manner. Past lessons can be unlocked at any time in any sequence. </Typography>
                    </Alert>
                }

                {/* lesson cards */}
                <Stack>
                    {LevelArray.length > 0 &&
                        LevelArray.map((level, index: any) => {
                            return classValue == "Class" || divisionValue == "Division" ? (
                                <LessonCard
                                    key={index}
                                    level={level}
                                    index={index}
                                    isDivSelected={false}
                                />
                            ) : (
                                <LessonCard
                                    key={index}
                                    level={level}
                                    index={index}
                                    isDivSelected={true}
                                    Unlock={Unlock}
                                    expired_Lessons={expired_Lessons}
                                    open_lessons = {open_lessons}
                                    CourseOTP = {CourseOTP}
                                    classValue = {classValue}
                                    divisionValue = {divisionValue}
                                    previousLevel = {index>=1 && LevelArray[index-1]}
                                    CourseName={CourseName}
                                />
                            );
                        })}
                </Stack>
            </Container>
        </Page>
    );
}





//************************* LESSON CARD ***************************
type LessonCardProps = {
    level: any,
    index: Number,
    isDivSelected: boolean,
    Unlock?: (lsID) => Promise<void>,
    expired_Lessons?: any,
    open_lessons?: any,
    CourseOTP?: string,
    divisionValue?: string,
    classValue?: string
    previousLevel?: any,
    CourseName?:string
}

export const LessonCard = (
    { level, index, isDivSelected, Unlock, expired_Lessons, open_lessons, CourseOTP, divisionValue, classValue, previousLevel, CourseName}: LessonCardProps) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    let tags = ["tag1", "tag2", "tag3", "tag4"];


    const getPythonLessonTypefromId = (id: string, course:any) => {
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

    const openLesson = async (lsID: string, course: any) => {
        try {
            const userId = localStorage.getItem("userID");
            
            let link = userId ?
            `${process.env.webAppUrl}/game/${lsID}?user_id=${userId}&otp=${CourseOTP}` :
            "#";
            
            if(course.lsCourse == "Python Basic")
            {
                const lessonType = getPythonLessonTypefromId(lsID, course);
                link = lessonType !== "" ?
                `${process.env.webAppUrl}/${lessonType}/${course.lsID}?user_id=${userId}&otp=${CourseOTP}`:
                "#"
            }
            (link && typeof window != 'undefined') && window.open(link)
        }
        catch (error) {
            console.log(error)
        }
    }

    const validity = (milliseconds) => {
        const d = new Date(Date.now());
        const date = d.getDate();
        const m = d.getMonth();
        const year = d.getFullYear();
        let hours = d.getHours();
        const period = (hours >= 12 && hours <= 24) ? "PM" : "AM";
        const minutes = d.getMinutes();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        let month = months[m];

        return `${date} ${month} ${year}, ${hours}:${minutes} ${period}`;
    }

    const getButtonsJSX = (lsID: string, course: any, maxActiveLesson:boolean) => {

        // active or opened
        if(course?.isActive || course?.isOpenAndActive){
            return <>
                <Button fullWidth variant="contained" color="inherit" sx={{ marginY: "10px" }} 
                onClick={()=>openLesson(lsID, course)}>
                    Open
                </Button>
            </>
        }

        // locked and expired
        else if((course?.isLocked && course?.isExpired && CourseOTP)){
            return <>
                <Button variant="outlined" fullWidth color="inherit" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lsID, course)}>
                    Open
                </Button>
                <Button variant="outlined" fullWidth color="error" sx={{ marginY: "10px" }} 
                onClick={()=>Unlock(lsID)}>
                    <LockIcon fill1="#FF4842" fill2="#FF4842" width="20px" height="20px"/>
                </Button>
            </>
        }

        // locked and active and next-lesson to be accessible
        else if((course?.isLocked && course?.isActive) || course?.nextLessonToUnlock){
            const openVariant = course?.nextLessonToUnlock ? "outlined" : "contained"

            return <>
                <Button variant={openVariant} fullWidth color="inherit" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lsID, course)}>
                    Open
                </Button>
                <Button variant="contained" fullWidth color="error" sx={{ marginY: "10px" }} 
                onClick={()=>Unlock(lsID)}>
                    <LockIcon fill1="#FFF" fill2="#FFF" width="20px" height="20px"/>
                </Button>
            </>
        }

        //max and locked
        else if(maxActiveLesson && course?.isLocked){
            return <>
                <Button variant={"contained"} fullWidth color="inherit" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lsID, course)}>
                    Open
                </Button>
                <Button variant="contained" fullWidth color="error" sx={{ marginY: "10px" }} 
                onClick={()=>Unlock(lsID)}>
                    <LockIcon fill1="#FFF" fill2="#FFF" width="20px" height="20px"/>
                </Button>
            </>
        }

        else {
            return <>
                <Button variant={maxActiveLesson?"contained":"outlined"} fullWidth color="inherit" sx={{ marginY: "10px" }}
                onClick={()=>openLesson(lsID, course)}>
                    Open
                </Button>
            </>
        }
    }

    const getShadow = (course: any) => {
        if (course.isExpired) {
            return "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.2)"
        }
        else if (course.isActive || course.isOpenAndActive || course?.maxActiveLesson) {
            return "0px 8px 16px 0px rgba(51, 102, 255, 0.24)"
        }
        else return "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.2)"
    }
    // let id = uuidv4();
    return (
        <Box mt={"40px"}>
            <Typography variant="h6" component={"h1"} paddingLeft={1}>
                Level {Number(index) + 1}
            </Typography>

            <Grid container mt="20px">
                {
                    level.map((course, i) => {
                        const circleRounded = course.lsID <= 9 ? "50%" : "30px";
                        const circleSize = course.lsID <= 9 ? "26px" : "30px";

                        // lesson after latest opened lesson to be activated i.e max-active-lesson
                        if (isDivSelected)
                        {
                            if (expired_Lessons?.includes(level[i - 1]?.lsID) &&
                            !expired_Lessons?.includes(course?.lsID) &&
                            !open_lessons?.includes(course.lsID))
                            {
                                course = { ...course, maxActiveLesson: true }
                                if(CourseOTP) course = { ...course, isLocked: true}
                            }
                            else if (course.lsLessonNo == 1 &&
                                !expired_Lessons?.includes(course?.lsID) &&
                                !open_lessons?.includes(course?.lsID)) 
                            {
                                course = { ...course, maxActiveLesson: true }
                                if (CourseOTP) course = { ...course, isLocked: true }
                            }

                            // below logic to make the first lesson of new level active if not expired and opened
                            if (index >= 1) {
                                if (i == 0) {
                                    if (expired_Lessons?.includes(previousLevel[previousLevel.length-1]?.lsID) &&
                                        !expired_Lessons?.includes(course?.lsID) &&
                                        !open_lessons?.includes(course.lsID)) {
                                        course = { ...course, maxActiveLesson: true }
                                        if (CourseOTP) course = { ...course, isLocked: true }
                                    }
                                }
                            }
                        }

                        return (
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`${course?.lsID}`}>
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
                                        ...((course.isActive || course.isOpenAndActive || course.maxActiveLesson) && { background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)" }),
                                        ...((course.isExpired && isLight) && { backgroundColor: pellete.light.grey[0] }),
                                        ...(((!course.isActive) && (!course.isExpired) && isLight && isDivSelected) && { backgroundColor: pellete.light.grey[200] }),
                                        boxShadow: getShadow(course),
                                    }}>

                                    <Stack spacing={1.5} padding={1}>
                                        {/* TITLE & INDEX */}
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                sx={{
                                                    color: isLight
                                                        ? pellete.light.grey[100]
                                                        : pellete.light.grey[900],
                                                    backgroundColor: isLight
                                                        ? pellete.light.grey[900]
                                                        : pellete.light.grey[200],
                                                    minWidth: circleSize,
                                                    minHeight: circleSize,
                                                    padding: "1px 7px",
                                                    border: "1.5px solid #F9FAFB",
                                                    borderRadius: circleRounded,
                                                    display: "grid",
                                                    placeItems: "center"
                                                }}
                                            >
                                                {course.lsLessonNo}
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: ".8rem",
                                                    color: (course.isActive || course.isOpenAndActive || course.maxActiveLesson) && pellete.light.grey[100]
                                                }}
                                            >
                                                {course?.lsName}
                                            </Typography>
                                        </Stack>

                                        {/* TAGS */}
                                        <Grid container gap={1}>
                                            {tags.map((tag, i) => (
                                                <Grid item key={i}>
                                                    {course[`lsSkillTag${i + 1}`] &&
                                                        <Chip
                                                            key={i}
                                                            size="small"
                                                            label={course[`lsSkillTag${i + 1}`]}
                                                            sx={{
                                                                color: isLight
                                                                    ? pellete.light.grey[600]
                                                                    : pellete.light.grey[400],
                                                                backgroundColor: isLight
                                                                    ? pellete.light.grey[500_16]
                                                                    : pellete.light.grey[700],
                                                                borderRadius: "10px",
                                                                ...((course.isActive || course.isOpenAndActive || course.maxActiveLesson) && {
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
                                        course.lsCourse !== "Python Basic" &&
                                        <Image alt="image" src={`https://app.educobot.com/liveLessons/thumbNails/${course.lsName}.png`} borderRadius={"8px"} />
                                    }

                                    <Stack gap={1} padding={1}>
                                        {/* DESCRIPTION */}
                                        <Typography sx={{ color: (course.isActive || course.isOpenAndActive || course.maxActiveLesson) ? "#fff" : pellete.light.grey[500] }}>
                                            {course?.lsDesc}
                                        </Typography>

                                        
                                        {/* VIEW REPORT */}
                                        {
                                        (course?.isExpired && !course?.isOpenAndActive) ?
                                            <Link
                                            href={{
                                                pathname: PATH_DASHBOARD.teacher.viewReport,
                                                query:{
                                                    lsID: course?.lsID,
                                                    //otp: CourseOTP,
                                                    div: divisionValue,
                                                    class: classValue,
                                                    course: CourseName,
                                                    LessonNo: course.lsLessonNo}
                                                }}>
                                                <Button variant="outlined" color="warning" fullWidth sx={{ fontWeight: 900 }}>View report</Button>
                                            </Link>
                                            :
                                            course?.isOpenAndActive &&
                                            <Link
                                            href={{
                                                pathname: PATH_DASHBOARD.teacher.viewProgress,
                                                query:{
                                                    lsID: course?.lsID,
                                                    otp: CourseOTP,
                                                    div: divisionValue,
                                                    class: classValue }
                                                }}>
                                                <Button variant="contained" color="warning" fullWidth sx={{ fontWeight: 900 }}>View report</Button>
                                            </Link>
                                        }

                                        {/* bottom buttons */}
                                        <Stack direction={"row"} justifyContent="space-around" gap={1}>
                                            {getButtonsJSX(course.lsID, course, course?.maxActiveLesson)}
                                        </Stack>

                                    </Stack>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}
