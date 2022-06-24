//1. getlessons
//2. open otp
//3. last active course
// all open otp blue, the very next to blue card should be grey but accessible

// if(obj.lsID == expiredLessons[index]?.id)
//             {
//               console.log("expired got")
//               return {...obj, otp: expiredLessons[index]['otp'], isExpired: true,}
//             }


import { paramCase } from "change-case";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
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

import { LoadingButton } from "@mui/lab";

import pellete from "../../../theme/palette";
import Image from "../../../components/Image";
import axios from "axios";
import dummyIMG from "../../../public/imgs/rabbitImg.png"
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import uuidv4 from "../../../utils/uuidv4";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

Curriculum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const CLASS_DATA = ["5", "6", "7", "8"];
const DIVISION_DATA = ["A", "B", "C", "D"];
const CourseNames = ["Introduction To Coding", "Python Basic", "Certificate in Data Science"];
const expiredLessons = [
  {id:"00351ca6-78bd-479a-94d6-e40a9cc86313", otp:3245},
  {id:"8bedf833-bde2-433c-9930-f9f8947f2631", otp:1263},
];

export default function Curriculum() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { push } = useRouter();

  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const [isOpen2, setOpen2] = useState<null | HTMLElement>(null);
  const [OpenTitleDDL, setOpenTitleDDL] = useState<null | HTMLElement>(null);
  const [closeAlert, setCloseAlert] = useState(true);
  const [closeAlertMsg, setCloseAlertMsg] = useState("");

  const [classValue, setClassValue] = useState("5");
  const [divisionValue, setDivisionValue] = useState("Division");
  const [CourseName, setCourseName] = useState("Introduction To Coding");

  const [MasterLessons, setMasterLessons] = useState([]);

  const [LevelArray, SetLevelArray] = useState([]);

  const token = localStorage.getItem("accessToken");

  const GetOpenPINs = async (allLessons) => {
    if (classValue !== "Class" && divisionValue !== "Division") {
      try {
        const response = await axios.post("https://api.educobot.com/sessionRoute/getOpenPIN",
        { "std": classValue, "div": divisionValue, course: CourseName},
        {
          headers: {
            "authorization": `Bearer ${token}`
          }
          });
          
          // now overwrite received data as active by matching id into MasterLessons
          //(logic inside map only works if active lesson data is there sequentially i.e from beginning)
          if (response.data.data) {
            const ActiveData = response.data.data;

            for(let i=0;i<ActiveData.length;i++)
            {
                for(let j=0; j<allLessons.length; j++)
                {
                    if(ActiveData[i]?.spLessonID == allLessons[j].lsID && !allLessons[j].hasOwnProperty('isExpired'))
                    {
                        allLessons[j]['otp'] = ActiveData[i]?.spPIN;
                        allLessons[j]['isActive'] = true;
                        allLessons[j]['date'] = ActiveData[i]?.spDate;
                    }
                }
            }

            return allLessons;
        }
      }
      catch (error) {
        console.log(error);
        return allLessons;
      }
    }
  }

  const getExpiredLessons = async(allLessons) => {
    if (classValue !== "Class" && divisionValue !== "Division") {
      try {
        const response = await axios.post("https://api.educobot.com/sessionRoute/getClosedPIN",
          { "std": classValue, "div": divisionValue, course: CourseName },
          {
            headers: {
              "authorization": `Bearer ${token}`
            }
          });

        if (response.data.data) {
          const ExpiredData = response.data.data;
          
          for(let i=0;i<ExpiredData.length;i++)
            {
                for(let j=0; j<allLessons.length; j++)
                {
                    if(ExpiredData[i]?.spLessonID == allLessons[j].lsID)
                    {
                        //allLessons[j]['otp'] = ExpiredData[i]?.spPIN;
                        allLessons[j]['isExpired'] = true;
                        allLessons[j]['date'] = ExpiredData[i]?.spDate;
                    }
                }
            }
          
        return allLessons;
      }
    }
    catch(err){
      console.log(err);
      return allLessons;
    }
  }
}

  const GetLatestActiveLesson = async (allLessons) => {
      if (classValue !== "Class" && divisionValue !== "Division") {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await axios.post("https://api.educobot.com/lessonsRoute/getMaxOTPLesson",
            { "std": classValue, "div": divisionValue },
            {
              headers: {
                "authorization": `Bearer ${token}`
              }
            });
  
          // now overwrite the data to make the nextlesson active
          let currentActiveLessson = response.data.data[0]?.maxLessonNo;
          if (currentActiveLessson>=0) {
            let newArr = allLessons;
            let i=1;
            
            // to make the previous lessons accessible if they are skipped from generating otp
            let j = currentActiveLessson - 1;
            if(j>0)
            {
              while(j>=0)
              {
                if(newArr[j]?.isActive != true  && newArr[j]?.isExpired != true){
                  newArr[j].isActive = true;
                }
                j--;
              }
            }
                  
            while(i<=allLessons.length)
            {
              if (!newArr[currentActiveLessson].hasOwnProperty('isExpired')) {
                newArr[currentActiveLessson].isActive = true;

                if(!newArr[currentActiveLessson + i].hasOwnProperty('isExpired')){
                  newArr[currentActiveLessson + i].nextLessonToBeAccess = true;
                  newArr[currentActiveLessson + i].nextLessonIDToBeAccess = newArr[currentActiveLessson + i].lsID;
                  i++;
                  break;
                }
              }
              else currentActiveLessson++
            }
            return newArr;
          }
        }
        catch (error) {
          console.log(error)
        }
      }
  }

  const getAllLessonData = async () => {
    // const formData = new FormData();
    // formData.append('courseName', CourseName);
    let body = {courseName:CourseName}
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

  const getAllLessonData1 = async () => {
    // const formData = new FormData();
    // formData.append('courseName', CourseName);
    let body = {courseName:CourseName}
    await axios.post("https://api.educobot.com/lessonsRoute/getLessonsByCourse", body,
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(async (res) => {
        if (res.status === 200) {
          let allLessonsArr = res.data.map(obj => obj.Lessons);
          const allLessons = allLessonsArr.flatMap(obj => obj);

          let updatedAllLessons = await getExpiredLessons(allLessons);
          updatedAllLessons = await GetOpenPINs(updatedAllLessons);
          updatedAllLessons = await GetLatestActiveLesson(updatedAllLessons);

          setMasterLessons([...updatedAllLessons]);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getOTP = async (id: any) => {
    if (CLASS_DATA.includes(classValue) && DIVISION_DATA.includes(divisionValue)) {
      const schoolID = localStorage.getItem("schoolID");
      const userID = localStorage.getItem("userID");
      let body = {
        "std": `${classValue}`,
        "div": `${divisionValue}`,
        "lessonID": `${id}`,
        "course": `${CourseName}`
      }

      await axios.post("https://api.educobot.com/sessionRoute/generateOTP", body,
        { headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
        .then(res => {
          if (res.status == 200) {
            getAllLessonData1();
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      setCloseAlertMsg("Please select the class and division");
      setCloseAlert(false);
    }
  }

  const mapMasterLessonsByLevels = () => {
    SetLevelArray([]);
    
    MasterLessons.length > 0 &&
    MasterLessons.map((les, index) => {
      const levelArr = MasterLessons.map(lesson => lesson?.lsLevel == index + 1 && lesson).filter(item => item != false)
      if(levelArr.length > 0)
        SetLevelArray(prev => [...prev, levelArr]);
    })
  }


  useEffect(() => {
    getAllLessonData1();
  }, [divisionValue, CourseName]);

  useEffect(() => {
    getAllLessonData();
  }, [CourseName]);

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
      (setClassValue(event.target.value), setDivisionValue("Division")) :
      ""
    setOpen(null);
  };

  const handleCloseDivision = (event: any) => {
    setDivisionValue(event.target.value)
    setOpen2(null);
    getAllLessonData();
  };

  const handleCloseTitleDDL = (event: any, title: string) => {
    setCourseName(title)
    setOpenTitleDDL(null)
  };


  return (
    <Page title="Teacher: Curriculum2">
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

          {/* class and division */}
          <Stack
            width={{ xs: "100%", sm: "auto" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            {/* <Button variant="outlined" color="inherit" onClick={handleOpenClass}>
              {classValue}
              <Iconify
                icon={
                  isOpen
                    ? "eva:arrow-ios-upward-fill"
                    : "eva:arrow-ios-downward-fill"
                }
                sx={{ ml: 0.5, width: 16, height: 16 }}
              />
            </Button> */}

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

            
          </Stack>
        </Stack>

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
                  getOTP={getOTP}
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
  getOTP?: (id: string) => Promise<void>,
  isDivSelected: boolean
}

export const LessonCard = ({ level, index, isDivSelected, getOTP }: LessonCardProps) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  let tags = ["tag1", "tag2", "tag3", "tag4"];


  const openLesson = async (lsID: string, course:any) => {
    try {
      let blocklyLessons = ["4bda4814-a2b1-4c4f-b102-eda5181bd0f8", "1d749e84-1155-4269-93ab-550ee7aabd4a"];
      let lessonType = blocklyLessons.includes(lsID) ? "blockly" : "game";
      
      const userId = localStorage.getItem("userID");
      let link = userId &&
      `${process.env.webAppUrl}/${lessonType}/${lsID}?user_id=${userId}`;
      
      link = course.lsCourse=="Python Basic"?`http://3.110.238.1:3003/script/${course.lsID}`:link;
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


  const getButtons = (lsID: string, course: any) => {
    // active & has otp
    if (course?.isActive == true && course?.otp) {
      return <>
        <Button fullWidth variant="contained" color="inherit" sx={{margin:"10px"}} onClick={() => openLesson(lsID, course)}>
          Open
        </Button>
        <Button fullWidth variant="contained" color="error" sx={{margin:"10px"}} onClick={async () => await getOTP(course.lsID)}>
          Reset OTP
        </Button>
      </>
    }
    // active & don't have otp
    else if (course?.isActive == true) {
      return <>
        <Button variant="contained" fullWidth color="inherit" sx={{margin:"10px"}} onClick={() => openLesson(lsID, course)}>
          Open
        </Button>
        <Button variant="contained" fullWidth color="error" sx={{margin:"10px"}} onClick={async () => await getOTP(course.lsID)}>
          Get OTP
        </Button>
      </>
    }
    // next lesson to be able to get otp
    else if (course.nextLessonToBeAccess == true) {
      return <>
        <Button variant="outlined" fullWidth color="inherit" sx={{margin:"10px"}} onClick={() => openLesson(lsID, course)}>
          Open
        </Button>
        <Button variant="outlined" fullWidth color="inherit" sx={{margin:"10px"}} onClick={async () => await getOTP(course.lsID)}>
          Get OTP
        </Button>
      </>
    }

    // expired lesson
    else if (course.isExpired && isDivSelected == true) {
      return <>
        <Button fullWidth variant="outlined" color="inherit" sx={{margin:"10px"}} onClick={() => openLesson(lsID, course)}>
          Open
        </Button>
      </>
    }

    else {
      return <>
        <Button variant="outlined" fullWidth color="inherit" sx={{margin:"10px"}} disabled>
          Open
        </Button>
        <Button variant="outlined" fullWidth disabled color="inherit" sx={{margin:"10px"}}>
          Get OTP
        </Button>
      </>
    }
  }

  const getShadow = (course: any)=>{
    if(course.isExpired){
      return "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.2)"
    }
    else if(course.isActive){
      return "0px 8px 16px 0px rgba(51, 102, 255, 0.24)"
    }
    else return "0 0 0 0"
  }
  // let id = uuidv4();

  return (
    <Box mt={"40px"}>
      <Typography variant="h6" component={"h1"} paddingLeft={1}>
        Level {Number(index) + 1}
      </Typography>

    <Grid container mt="18px">
      {
        level.map((course, i) => {
          const circleRounded = course.lsID <= 9 ? "50%" : "30px";
          const circleSize = course.lsID <= 9 ? "26px" : "30px";

          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={`${course?.lsID}`}>
              <Card
                sx={{
                  py: 2.5,
                  px: 1,
                  my: 2,
                  mx: 1,
                  //minHeight: "475px",
                  maxWidth: "350px",
                //   width:"252px",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  ...((course.isActive) && { background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)" }),
                  ...(((!course.isActive) && (course.nextLessonToBeAccess !== course.lsID) && isLight) && { backgroundColor: pellete.light.grey[200] }),
                  ...((course.isExpired && isLight) && { backgroundColor: pellete.light.grey[0] }),
                  boxShadow:getShadow(course),
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
                        minWidth:circleSize,
                        minHeight:circleSize,
                        padding: "1px 7px",
                        border: "1.5px solid #F9FAFB",
                        borderRadius: circleRounded,
                        display:"grid",
                        placeItems:"center"
                      }}
                    >
                      {course.lsLessonNo}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: ".8rem",
                        color: course.isActive && pellete.light.grey[100]
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
                              ...(course.isActive == true && {
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
                  course.lsCourse!=="Python Basic" &&
                  <Image alt="image" src={`https://app.educobot.com/liveLessons/thumbNails/${course.lsName}.png`} borderRadius={"8px"} />
                  }

                <Stack gap={1} padding={1}>
                  {/* DESCRIPTION */}
                  <Typography sx={{ color: course.isActive ? "#fff" : pellete.light.grey[500] }}>
                    {course?.lsDesc}
                  </Typography>


                  {/* OTP CONTAINER */}

                  {/* if have otp and lesson is active */}
                  <Stack>
                    {course?.otp &&

                      <Typography variant="h6" component={"h1"} textAlign="center" color={pellete.light.grey[200]}>
                        OTP {course.otp}
                      </Typography>
                    }
                  </Stack>


                  {/* VIEW REPORT / PROGRESS BUTTON */}
                  {(course.isActive) ?
                    course?.otp &&
                    // active
                    <Stack direction={"column"}>
                      {course?.otp &&
                        <>
                          <Typography variant="body2" textAlign="center" color={pellete.light.grey[200]}>
                            Valid till {validity(course?.startAt)}
                          </Typography>
                        </>
                      }
                      <Link href={PATH_DASHBOARD.teacher.viewProgress + `?lsID=${course?.lsID}&otp=${course?.otp}`}>
                        <Button variant="contained" color="error" fullWidth sx={{ my: 1, fontWeight: 900 }}>
                          View Progress</Button>
                      </Link>
                    </Stack>
                    :
                    // expired
                    (course?.isExpired == true && isDivSelected == true) &&
                    <Link href={PATH_DASHBOARD.teacher.viewReport + `?lsID=${course?.lsID}`}>
                      <Button variant="contained" color="warning" fullWidth sx={{ my: 1, fontWeight: 900 }}>View report</Button>
                    </Link>
                  }

                  {/* bottom buttons */}
                  <Stack direction={"row"} justifyContent="space-around">
                    {getButtons(course.lsID, course)}
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
