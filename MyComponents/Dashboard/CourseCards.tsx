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

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 0),
  },
}));

const CourseCards = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [allLessonsData, setAllLessonsData] = useState([]);

  // open lessons
  const GetOpenPINs = async (allLessons) => {
      try {
        const response = await axios.post("https://api.educobot.com/sessionRoute/getOpenPIN",
        { "std": "5", "div": "A", course: "Introduction To Coding"},
        {
          headers: {
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`
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
  
  const getAllLessonData1 = async () => {
    // const formData = new FormData();
    // formData.append('courseName', CourseName);
    let body = {courseName:"Introduction To Coding"}
    await axios.post("https://api.educobot.com/lessonsRoute/getLessonsByCourse", body,
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(async (res) => {
        if (res.status === 200) {
            console.log(res.data)
          let allLessonsArr = res.data.map(obj => obj.Lessons);
          let allLessons = allLessonsArr.flatMap(obj => obj);
          allLessons = await GetOpenPINs(allLessons);

          setAllLessonsData([...allLessons]);

          // allLessons = await GetOpenPINs(allLessons);
          // setState(allLessons);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  const setState = (allLessons)=>{
    setAllLessonsData([...allLessons]);
  }


  useEffect(() => {
    getAllLessonData1();
  }, []);
  


  return (
    <div>
      <RootStyle>
        <Stack rowGap={4} direction="column">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Typography variant="body1" component="h1" fontWeight={600}>
              You are in level 1 that has {dashboardCardData.length} lessons
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
        </Stack>

        <Grid container spacing={4} mt={0}>
          {dashboardCardData.map((card, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                <CardComp
                  data={card}
                  index={index + 1}
                  isLight={isLight}
                  theme={theme}
                />
              </Grid>
            );
          })}
        </Grid>
      </RootStyle>
    </div>
  );
};

export default CourseCards;

// type CardProps = {
//   course: any;
//   index: number;
//   isLight: any;
//   theme: any;
// };

// export const CardComp = ({ course, index, isLight, theme }: CardProps)=>{
//   let tags = ["tag1", "tag2", "tag3", "tag4"];

//   return(
//     <Card
//       sx={{
//         py: 2.5,
//         px: 1,
//         my: 2,
//         mx: 1,
//         //minHeight: "475px",
//         maxWidth: "350px",
//         //   width:"252px",

//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         ...((course.isActive) && { background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)" }),
//         ...(((!course.isActive) && (course.nextLessonToBeAccess !== course.lsID) && isLight) && { backgroundColor: pellete.light.grey[200] }),
//         ...((course.isExpired && isLight) && { backgroundColor: pellete.light.grey[0] })
//       }}>

//       <Stack spacing={1.5} padding={1}>
//         {/* TITLE & INDEX */}
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Typography
//             variant="body2"
//             fontWeight={600}
//             sx={{
//               color: isLight
//                 ? pellete.light.grey[100]
//                 : pellete.light.grey[900],
//               backgroundColor: isLight
//                 ? pellete.light.grey[900]
//                 : pellete.light.grey[200],
//               padding: "1px 7px",
//               border: "1.5px solid #F9FAFB",
//               borderRadius: "100%",
//               display: "grid",
//               placeItems: "center"
//             }}
//           >
//             {course.lsLessonNo}
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: ".8rem",
//               color: course.isActive && pellete.light.grey[100]
//             }}
//           >
//             {course?.lsName}
//           </Typography>
//         </Stack>

//         {/* TAGS */}
//         <Grid container gap={1}>
//           {tags.map((tag, i) => (
//             <Grid item key={i}>
//               {course[`lsSkillTag${i + 1}`] &&
//                 <Chip
//                   key={i}
//                   size="small"
//                   label={course[`lsSkillTag${i + 1}`]}
//                   sx={{
//                     color: isLight
//                       ? pellete.light.grey[600]
//                       : pellete.light.grey[400],
//                     backgroundColor: isLight
//                       ? pellete.light.grey[500_16]
//                       : pellete.light.grey[700],
//                     borderRadius: "10px",
//                     ...(course.isActive == true && {
//                       backgroundColor: pellete.light.grey[300],
//                       color: pellete.light.grey[800],
//                     }),
//                   }}
//                 />
//               }
//             </Grid>
//           ))}
//         </Grid>

//       </Stack>
//       {
//         course.lsCourse !== "Python Basic" &&
//         <Image alt="image" src={`https://app.educobot.com/liveLessons/thumbNails/${course.lsName}.png`} borderRadius={"8px"} />
//       }

//       <Stack gap={1} padding={1}>
//         {/* DESCRIPTION */}
//         <Typography sx={{ color: course.isActive ? "#fff" : pellete.light.grey[500] }}>
//           {course?.lsDesc}
//         </Typography>

//       </Stack>
//     </Card>
//   )
// }


type CardProps = {
  data: {
    title: string;
    tags: string[];
    desc: string;
    ratings?: number | undefined;
    status: string;
    img: string;
  };
  index: number;
  isLight: any;
  theme: any;
};

export const CardComp = ({ data, index, isLight, theme }: CardProps) => {
  type StarProps = {
    full: number;
    half: number;
    disabled: number;
  };
  const starsCoin: StarProps = {
    full: 0,
    half: 1,
    disabled: 0,
  };

  // if float
  if (data.ratings && Number.isInteger(data.ratings) === false) {
    let round = Math.round(data.ratings);
    starsCoin.full = round - 1;
    starsCoin.disabled = 5 - round;
  }
  // if integer
  else if (data.ratings && Number.isInteger(data.ratings)) {
    starsCoin.full = data.ratings;
    starsCoin.disabled = 5 - starsCoin.full;
    starsCoin.half = 0;
  }
  // if zero ratings
  else if (data.ratings == 0) {
    starsCoin.disabled = 5;
    starsCoin.half = 0;
  }

  const getShadow = (status)=>{
    if(status=="done"){
      return "0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.2)"
    }
    else if(status=="start"){
      return "0px 8px 16px 0px rgba(51, 102, 255, 0.24)"
    }
    else return "0 0 0 0"
  }

  return (
    <Card
      sx={{
        py: 2.5,
        px: 1,
        ...(data.status === "start" && {
          background: "linear-gradient(135deg, #84A9FF 0%, #1939B7 100%)",
        }),
        ...(data.status === "locked" && {
          background: isLight && theme.palette.background.neutral,
        }),
        //boxShadow: isLight && data.status === "done" && shadows.light[3],
        //boxShadow: '0px 0px 2px 0px rgba(145, 158, 171, 0.2)'
        boxShadow:getShadow(data.status),
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
              borderRadius: "100%",
              padding: "0px 7px",
              border: "1.1px solid #F9FAFB",
              ...(data.status === "start" && {
                backgroundColor: pellete.light.grey[900],
                color: pellete.light.grey[100],
              }),
            }}
          >
            {index}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: ".8rem",
              ...(data.status === "start" && {
                color: pellete.light.grey[100],
                fontWeight: 500,
              }),
            }}
          >
            {data.title}
          </Typography>
        </Stack>

        {/* tags */}
        <Grid container gap={1}>
          {data.tags.map((tag, i) => (
            <Grid item key={i}>
              <Chip
                key={i}
                size="small"
                label={tag}
                sx={{
                  color: isLight
                    ? pellete.light.grey[600]
                    : pellete.light.grey[400],
                  backgroundColor: isLight
                    ? pellete.light.grey[500_16]
                    : pellete.light.grey[700],
                  borderRadius: "10px",
                  ...(data.status === "start" && {
                    backgroundColor: pellete.light.grey[300],
                    color: pellete.light.grey[800],
                  }),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>

        {/* image */}
      <Image alt="image" src={data.img} width="100" borderRadius={1} />

      <Stack gap={1} padding={1}>
        {/* description */}
        <Typography
          sx={{
            color: pellete.light.grey[500],
            ...(data.status === "start" && { color: pellete.light.grey[100] }),
          }}
        >
          {data.desc}
        </Typography>

        {/* ratings */}
        {data.ratings !== undefined && data.status !== "locked" && (
          <Stack direction="row" alignItems="center" justifyContent="center">
            {new Array(starsCoin.full).fill(1).map((item, index) => {
              return <StarFull key={index} />;
            })}
            {new Array(starsCoin.half).fill(1.5).map((item, index) => {
              return <StarHalf key={index} />;
            })}
            {new Array(starsCoin.disabled).fill(10).map((item, index) => {
              return <StarDisable key={index} />;
            })}
          </Stack>
        )}

        {/* buttons */}
        {data.status === "done" ? (
          <Button variant="outlined" color="inherit">
            Revise
          </Button>
        ) : data.status === "start" ? (
          <Button variant="contained" color="error">
            Start Lesson
          </Button>
        ) : (
          <Button variant="contained" color="inherit" disabled>
            <IconLock />
          </Button>
        )}
      </Stack>
    </Card>
  );
};
