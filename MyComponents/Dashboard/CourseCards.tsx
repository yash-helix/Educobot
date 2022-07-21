// @mui
import { useTheme, styled } from "@mui/material/styles";
import {
  Card,
  Link,
  Stack,
  Button,
  Typography,
  Container,
  Grid,
  Chip,
  MenuItem,
  Menu,
} from "@mui/material";
import NextLink from "next/link";
import Image from "../../components/Image";
import { dashboardCardData } from "../../staticData";
import StarFull from "../../assets/icon_starFull";
import StarHalf from "../../assets/icon_starHalf";
import StarDisable from "../../assets/icon_starDisable";
import IconLock from "../../assets/icon_Lock";
import shadows from "../../theme/shadows";
import pellete from "../../theme/palette";
import Iconify from "../../components/Iconify";
import axios from "axios";
import { useEffect, useState } from "react";
import MemoCoin1 from "../../assets/stars/1";
import MemoCoin75 from "../../assets/stars/75";
import MemoCoin50 from "../../assets/stars/50";
import MemoCoin25 from "../../assets/stars/25";
import MemoCoin0 from "../../assets/stars/0";

const url: any = process.env.devUrl;
const CourseNames = ["Introduction To Coding", "Python Basic", "Certificate in Data Science"];

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 0),
  },
}));

const CourseCards = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [OpenTitleDDL, setOpenTitleDDL] = useState<null | HTMLElement>(null);
  const [CourseName, setCourseName] = useState(localStorage.getItem("course") || "Introduction To Coding");

  const [allLessonsData, setAllLessonsData] = useState([]);
  const [levelArray, setLevelArray] = useState([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [OTP, setOTP] = useState("");

  // MAIN FUNCTION TO BEGIN
  const getUserDetails = async () => {
    try {
      let body = {
        "schoolID": localStorage.getItem("schoolID"),
        "sdUID": localStorage.getItem("userID")
      }

      const userRes = await axios.post(`${url.EduCobotBaseUrl}/${url.getStudents}`,
        body,
        { headers: { 'Content-Type': 'application/json' } }
      )
      setUserDetails(userRes?.data?.DATA[0]);
      getLessonData(userRes?.data?.DATA[0]);
    }
    catch (err) {
      console.log(err + "Error Occurred while getting user details")
      return [];
    }
  }

  const getLessonData = async (userDetails) => {
    // Getting completed lessons from all lessons of this particular user
    let body = { courseName: CourseName, userID: userDetails.sdUID }
    try {
      await axios.post(`${url.EduCobotBaseUrl}/${url.getStudentLessonData}`, body,
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(async (res) => {
        if (res.status === 200) {
          let allLessonsArr = res.data;
          let completedLessons = allLessonsArr.map(obj => obj?.Complete > 0 ? { ...obj, completed: true } : false).filter(obj => obj !== false);

          // getting open lessons
          let openLessons = await GetOpenPINs(allLessonsArr, userDetails);

          setAllLessonsData([...completedLessons, ...openLessons]);
        }
      })
      .catch(err => {
        console.log(err.message)
      })
    } 
    catch (error) {
      setAllLessonsData([]);
    }
  }


  // OPEN LESSONS
  const GetOpenPINs = async (allLessons, userDetails) => {
    try {
      const body = {
        "std": userDetails?.sdClass,
        "div": userDetails?.sdDiv,
        course: CourseName,
        schoolID: localStorage.getItem("schoolID"),
      }
      const response = await axios.post(`${url.EduCobotBaseUrl}/${url.getOpenPIN}`, body,
        { headers: { "authorization": `Bearer ${localStorage.getItem("accessToken")}` } });

      if (response.data.length > 0) {
        setOTP(response.data[0]?.spPIN)

        // here we have all ids of open lessons
        const openLessonIds = [];
        response.data.map(pinObj => {
          pinObj.Lessons.map(openPinLessonObj => {
            openLessonIds.push(openPinLessonObj.sdLesson)
          })
        })

        // now get open-lessons by mapping allLesson with openLessonIds where completed property is 0
        let allOpenLessons: any[];
        allOpenLessons = allLessons.sort((a, b) => a.lsLessonNo - b.lsLessonNo)

        allOpenLessons = allOpenLessons.map((lesson, i) => {
          if (openLessonIds.includes(lesson.lsID) && lesson.Complete < 1) {
            return { ...lesson, locked: true }
          }
        }).filter(lesson => lesson !== undefined)

        allOpenLessons[0]['locked'] = false;
        allOpenLessons[0]['start'] = true;

        return allOpenLessons
      }
      else return [];
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }


  // POST EVAL DATA
  const postEvalData = async (lessonID) => {
    const body = {
      "userID": userDetails.sdUID,
      "edType": "B",
      "std": userDetails.sdClass,
      "div": userDetails.sdDiv,
      "status": 'L',
      "lessonID": lessonID,
      "rollNo": userDetails.sdRollNo,
      "pin": OTP,
      "schoolID": userDetails.sdSchoolID,
      "coins": 0
    }
    await axios.post(`${url.EduCobotBaseUrl}/${url.postEvalData}`, body);
  }


  // group by levels
  const mapMasterLessonsByLevels = () => {
    setLevelArray([]);
    if (allLessonsData.length > 0) {
            // grouping
            const groupedByCategoryArr = allLessonsData.reduce((group, lesson) => {
                const { lsLevel } = lesson;
                group[lsLevel] = group[lsLevel] ?? [];
                group[lsLevel].push(lesson);
                return group;
            }, {})

            // now getting the lessons of one level and putting in array.
            Object.keys(groupedByCategoryArr).map(levelNo => {
                if (groupedByCategoryArr[levelNo].length > 0) {
                    let levelArr = [];
                    levelArr = groupedByCategoryArr[levelNo].map((lesson, i) => {
                        return { ...lesson }
                    })

                    setLevelArray(prev => [...prev, levelArr]);
                }
            })
        }
  }


  // displaying coins logic
  const getCoins = (lessonCoins) => {
    let arr = ['0', '0', '0', '0', '0']
    try {
      let i: number;
      let int = lessonCoins.toString()?.split('.')[0];
      let deci = lessonCoins.toString()?.split('.')[1];

      for (i = 0; i < Number(int); i++) {
        arr[i] = '1'
      }

      if (Number(deci) !== 0 && Number(deci)) {
        arr[i] = `.${deci}`
      }
      return arr
    }
    catch (error) {
      return arr
    }
  }


  // get the lesson id of python
  const getPythonLessonTypefromId = (id: string, course: any) => {
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
  

  // redirection on click of start and revise
  const openLesson = async (lsID: string, course: any) => {
    try {
      const userId = localStorage.getItem("userID");

      let link = userId ?
        `${process.env.webAppUrl}/game/${lsID}?user_id=${userId}&otp=${OTP}` :
        "#";

      if (course.lsCourse == "Python Basic") {
        const lessonType = getPythonLessonTypefromId(lsID, course);
        link = lessonType !== "" ?
          `${process.env.webAppUrl}/${lessonType}/${course.lsID}?user_id=${userId}&otp=${OTP}` :
          "#"

        link = lessonType == "quiz" ? `${process.env.dashboardUrl}/dashboard/quiz/${course.lsID}?user_id=${userId}&otp=${OTP}` : link
      }
      (link && typeof window != 'undefined') && window.open(link)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getUserDetails();
  }, [CourseName]);

  
  useEffect(() => {
    mapMasterLessonsByLevels();
  }, [allLessonsData])



  // CourseName
  const handleOpenTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenTitleDDL(event.currentTarget);
  };
  
  const handleCloseTitleDDL = (event: any, title: string) => {
    setCourseName(title)
    setOpenTitleDDL(null)
    localStorage.setItem("course", title)
    // getLessonData(userDetails);
  };


  return (
    <div>
      <RootStyle>
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


        <Stack>
          {levelArray.map((level, index) => {
            return (
              <CardComp
                key={index}
                level={level}
                index={index + 1}
                isLight={isLight}
                theme={theme}
                postEvalData={postEvalData}
                getCoins={getCoins}
                openLesson={openLesson}
              />
            );
          })}
        </Stack>
      </RootStyle>
    </div>
  );
};

export default CourseCards;


type CardProps = {
  // data: {
  //   Complete: number
  //   Incomplete: number
  //   coins: number
  //   createdBy: any
  //   createdOn: any
  //   lsCourse: string
  //   lsDesc: string
  //   lsFilePath: string
  //   lsID: string
  //   lsImgUrl: string
  //   lsLanguages: string
  //   lsLessonNo: number
  //   lsLevel: number
  //   lsName: string
  //   lsSkillTag1: string
  //   lsSkillTag2: string
  //   lsSkillTag3: string
  //   lsStd: string
  //   lsThumnail: string
  //   lsType: string
  //   lsWeek: number
  //   notLogged: number
  //   start: boolean
  //   locked: boolean
  //   completed:boolean
  // };
  index: number;
  level: any;
  isLight: any;
  theme: any;
  postEvalData: (lessonId: string) => void
  getCoins: (lessonCoins: number) => string[]
  openLesson:(ld:string, course:any) => void
};

export const CardComp = ({ level, index, isLight, theme, postEvalData, getCoins, openLesson }: CardProps) => {
  let tags = ["tag1", "tag2", "tag3", "tag4"];


  const getShadow = (complete: boolean, locked: boolean, start: boolean) => {
    if (complete) {
      return "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 1px 0px 2px 0px rgba(145, 158, 171, 0.2)"
    }
    else if (start) {
      return "0px 8px 16px 0px rgba(51, 102, 255, 0.24)"
    }
    else return "0 0 0 0"
  }

  return (
    <Stack mt={4}>

        <Stack rowGap={4} direction={{ xs: "column", sm: "row" }} justifyContent="space-between">
          <Typography variant="body1" component="h1" fontWeight={600}>
            You are in level {level[0].lsLevel} that has {level.length} lessons
          </Typography>

          <NextLink href="#" passHref>
            <Link color={"inherit"}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ display: "inline-flex" }}
                spacing={1}
              >
                <Typography variant="body2">
                  View all levels and lessons
                </Typography>
                <Iconify
                  icon={"eva:arrow-ios-upward-fill"}
                  sx={{ transform: "rotate(90deg)" }}
                  width={20}
                  height={20}
                />
              </Stack>
            </Link>
          </NextLink>
        </Stack>

      <Grid container spacing={4} mt={0}>
        {
          level.map(data => {
            const circleRounded = data.lsLessonNo <= 9 ? "50%" : "30px";
            const circleSize = data.lsLessonNo <= 9 ? "26px" : "30px";

            return <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={data.lsLessonNo}>
              <Card
                sx={{
                  py: 2.5,
                  px: 1,
                  ...(data.start && {
                    background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)",
                  }),
                  ...(data.completed && {
                    background: isLight && theme.palette.background.grey,
                  }),
                  ...(data.locked && {
                    backgroundColor: isLight && pellete.light.grey[200],
                  }),
                  boxShadow: getShadow(data.completed, data.locked, data.start),
                }}
              >
                {/* title & index */}
                <Stack spacing={1.5} padding={1}>
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
                        borderRadius: circleRounded,
                        minWidth: circleSize,
                        minHeight: circleSize,
                        padding: "1px 7px",
                        border: "1.5px solid #F9FAFB",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {data.lsLessonNo}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: ".8rem",
                        ...(data.start && {
                          color: pellete.light.grey[100],
                          fontWeight: 500,
                        }),
                      }}
                    >
                      {data.lsName}
                    </Typography>
                  </Stack>

                  {/* TAGS */}
                  <Grid container gap={1}>
                    {tags.map((tag, i) => (
                      <Grid item key={i}>
                        {data[`lsSkillTag${i + 1}`] &&
                          <Chip
                            key={i}
                            size="small"
                            label={data[`lsSkillTag${i + 1}`]}
                            sx={{
                              color: isLight
                                ? pellete.light.grey[600]
                                : pellete.light.grey[400],
                              backgroundColor: isLight
                                ? pellete.light.grey[500_16]
                                : pellete.light.grey[700],
                              borderRadius: "10px",
                              ...((data.start) && {
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
                  data.lsCourse !== "Python Basic" &&
                  <Image alt="image" src={`${url.imageLink}/${data.lsName}.png`} borderRadius={1} />
                }

                <Stack gap={1} padding={1}>
                  {/* description */}
                  <Typography
                    sx={{
                      color: pellete.light.grey[500],
                      ...(data.start && { color: pellete.light.grey[100] }),
                    }}
                  >
                    {data.lsDesc}
                  </Typography>

                  {/* coins */}
                  {
                    data.completed &&
                    <Stack justifyContent={"center"} direction={"row"} gap={1}>
                      {
                        getCoins(data.coins).map(coin => {
                          if (coin == "1") {
                            return <MemoCoin1 />
                          }
                          else if (coin == ".75") {
                            return <MemoCoin75 />
                          }
                          else if (coin == ".5") {
                            return <MemoCoin50 />
                          }
                          else if (coin == ".25") {
                            return <MemoCoin25 />
                          }
                          else {
                            return <MemoCoin0 />
                          }
                        })
                      }
                    </Stack>
                  }


                  {/* butons */}
                  {data.completed ? (
                    <Button variant="outlined" color="inherit" onClick={()=>openLesson(data.lsID, data)}>
                      Revise
                    </Button>
                  ) : data.start ? (
                    <Button variant="contained" color="error" onClick={() => {
                      postEvalData(data.lsID);
                      openLesson(data.lsID, data);
                      }}>
                      Start Lesson
                    </Button>
                  ) : (
                    <Button variant="contained" color="inherit" disabled>
                      <IconLock />
                    </Button>
                  )}
                </Stack>
              </Card>
            </Grid>
          })
        }
      </Grid>
    </Stack>
  );
};
