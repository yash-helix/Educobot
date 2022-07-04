import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Iconify from '../../../components/Iconify'
import Page from '../../../components/Page'
import useSettings from '../../../hooks/useSettings'
import Layout from '../../../layouts'
import data from '../../../_mock/data'
import { LessonCard } from './curriculum'
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
  import pellete from "../../../theme/palette";
import UserRed from '../../../assets/userIcons/UserRed';
import UserGrey from '../../../assets/userIcons/UserGrey';
import UserYellow from '../../../assets/userIcons/UserYellow';
import UserGreen from '../../../assets/userIcons/UserGreen';
import ProgressStudentList from './viewProgressStudentsTable'
import axios from 'axios'


ViewProgress.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}


const studentsDummyData = [
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
    {
        roll:"2",
        status:3
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"3",
        status:1
    },
    {
        roll:"4",
        status:4
    },
    {
        roll:"1",
        status:2
    },
]

const legends = [
    {
        text:"Not Started",
        icon: <UserGrey width={24} height={24}/>
    },
    {
        text:"Doing",
        icon: <UserYellow width={24} height={24}/>
    },
    {
        text:"Done",
        icon: <UserGreen width={24} height={24}/>
    },
    {
        text:"Incomplete",
        icon: <UserRed width={24} height={24}/>
    }
]




export default function ViewProgress() {
    const {query} = useRouter();
    const router = useRouter();

    const { themeStretch } = useSettings();
    const [lessonData, setLessonData] = useState({lsName:null, lsLessonNo:null});
    const [data, setData] = useState(studentsDummyData);
    const [students, setStudents] = useState([]);

    const getLessonByID = async (id) => {
        try {
            const formData = new FormData();
            formData.append("lessonID", id);
            const response = await axios.post("https://appssl.educobot.com:8443/EduCobotWS/lessonsWS/getLessonsByID",
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response.data.STATUS == "SUCCESS") {
                response.data.DATA && setLessonData(response.data.DATA[0]);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // students info
    const getStudentsInfo = async() => {
        try {
            const body = {
                "schoolID":localStorage.getItem("schoolID"),
                "std": query.class,
                "div": query.div,
                "lessonID":query.lsID,
                "otp":query.otp,
                "course":query.course
            }
            const res = await axios.post("https://api.educobot.com/lessonsRoute/getStudentsProgress", body);
            if(res.data.data.length>0)
            {
                setStudents(res.data.data)
            }
        }
        catch (error) {
            console.log(error)
            setStudents([])
        }
    }

    useEffect(() => {
        query.lsID && getLessonByID(query.lsID);
        query.lsID && getStudentsInfo();
    },[])
    


    return (
        <Page title="Teacher : View Progress">

            {/* maxWidth={themeStretch ? false : "xl"} */}
            <Container>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent={"space-between"}
                    alignItems={{ xs: "start", md: "center" }}>
                {/* coursename and otp */}
                    <Stack width={{ xs: "100%", sm: "auto" }}
                        direction={"row"}
                        alignItems="center"
                        spacing={0.6}>
                        <Iconify
                            onClick={()=>router.back()}
                            icon={"eva:arrow-ios-back-fill"}
                            sx={{width:25, height:25, cursor:"pointer" ,color:pellete.light.grey[600]}}
                        />
                        <Typography variant='h5' component="h6" fontFamily={"Public Sans"}>
                            {lessonData?.lsName}{((query.otp!='undefined') && (query.otp!='false')) ? `, OTP ${query.otp}` : ""}
                        </Typography>
                    </Stack>

                {/* legends */}
                    <Stack
                        width={{ xs: "100%", sm: "auto" }}
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}>
                            {
                                legends.map((obj, index)=>{
                                    return(
                                    <Stack direction={"row"} spacing={0.1} key={index}>
                                    {obj.icon}
                                    <Typography fontWeight={600}>
                                        {obj.text}
                                    </Typography>
                                </Stack>)
                                })
                            }
                    </Stack>
                </Stack>

                {/* students */}
                <Grid container spacing={.8} mt={3.2} gap={1.3} gridTemplateColumns="repeat(10, 1fr)" gridTemplateRows="repeat(4, 1fr)">
                    {
                        students.map((student, i)=>{
                            if(student?.edStatus=="C"){
                                return <UserIcon UserIcon={<UserGreen width={100} height={100}/>} student={student}/>
                            }
                            else if(student.edStatus=="L"){
                                return <UserIcon UserIcon={<UserYellow width={100} height={100}/>} student={student}/>
                            }
                            else if(student.edStatus=="X"){
                                return <UserIcon UserIcon={<UserGrey width={100} height={100}/>} student={student}/>
                            }
                        })
                    }
                </Grid>


                {/* students table */}
                {
                    students.length>0 &&
                    <ProgressStudentList lessonNo={lessonData?.lsLessonNo} students={students}/>
                }

            </Container>
        </Page>
    )
}

type PropTypes = {
    UserIcon?: React.ReactNode,
    student:{edStatus:string, sdRollNo:string},
}

const UserIcon : React.FC<PropTypes> = (props) => {
    const {UserIcon} = props;
    return <Grid item key={props.student?.sdRollNo}>
        <Stack sx={{position:'relative'}}>
            {UserIcon}
            <Typography variant='h5' component={"h4"} sx={{
                position: 'absolute',
                bottom: 11,
                color: '#fff',
                left: '50%',
                transform:"translate(-50%)"
            }}>
                {props.student?.sdRollNo}
            </Typography>
        </Stack>
    </Grid>
}


