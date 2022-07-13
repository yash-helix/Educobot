import React, { useEffect, useState } from 'react'
import { Typography, Container, Stack, Button, Box, useTheme } from "@mui/material";
// components
import Page from "../../../components/Page";
// hooks
import useSettings from "../../../hooks/useSettings";
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router';
import styles from "../../../styles/Home.module.css";
import QuizDialog from '../../../MyComponents/DialogBoxComp/QuizDialog';
import axios from 'axios';
import { GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await fetch(`https://app.educobot.com/liveLessons/pythonQuiz/${context.params.id}.json`);

    if (response.status === 404) {
        return {
            notFound: true,
        }
    }
    let res = await response.json() ?? "";

    let { QuestionArr } = res
    return {
        props: { QuestionArr, id: context.params.id },
    };
}

const Quiz = ({ QuestionArr, id }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    const router = useRouter();
    const language = { English: 1, Hindi: 2, Marathi: 3, Spanish: 4, Arabic: 5, Swaheli: 6 }
    const [lang, setLang] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dialogInfo, setDialogInfo] = useState({ dialogStatus: "correct", message: QuestionArr[currentQuestion].correct_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: QuestionArr.length });
    const [lessonDetails, setLessonDetails] = useState<any>([]);

    async function getLessonsDetails() {
        let formData = new FormData();
        formData.append("lessonID", id);

        await axios.post("https://appssl.educobot.com:8443/EduCobotWS/lessonsWS/getLessonsByID", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                setLessonDetails(res.data.DATA[0]);
            })
            .catch(err => {
                console.log("Not Fetched", err.message, formData)
            })
    }

    useEffect(() => {
        getLessonsDetails();
    }, []);

    function onChange(e) {
        setLang(parseInt(e.target.value))
    }

    function evaluateAnswer(event) {
        let selectedAnswer = event.target.value;
        if (QuestionArr[currentQuestion].correct_answer === selectedAnswer) {
            // setCurrentQuestion(currentQuestion + 1)
            setDialogInfo({ dialogStatus: "correct", message: QuestionArr[currentQuestion].correct_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: QuestionArr.length });
        } else {
            // console.log(currentQuestion)
            setDialogInfo({ dialogStatus: "incorect", message: QuestionArr[currentQuestion].incorrect_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: QuestionArr.length });
        }
        document.getElementById("quiz_dialog_btn").click();
    }

    return (
        <Page title="User: Quiz" sx={{ height: "100%" }}>
            <Container
                // maxWidth={themeStretch ? false : "xl"}
                maxWidth={false}
                sx={{ height: "100%", fontFamily: "Public Sans" }}>
                <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "7%" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", whiteSpace: "pre-Wrap", fontSize: "14px" }}>
                        <Button
                            sx={{ minWidth: "32px" }}
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <Icon
                                style={{ color: isLight ? "#000" : "#fff", fontSize: "18px" }}
                                icon="eva:arrow-ios-back-fill"
                            />
                        </Button>
                        <Typography component={"span"} sx={{ fontWeight: "700", fontSize: "18px" }}>{lessonDetails.lsName}</Typography> -  {lessonDetails.lsDesc}
                    </Typography>

                    <Stack sx={{ display: "inline" }}>
                        {/* <select
                            className={`${styles.select_language}`}
                            style={{ backgroundColor: isLight ? "#fff" : theme.palette.grey[900] }}
                            value={lang}
                            onChange={onChange}
                        >
                            {Object.keys(language).map(key => (
                                <option key={key} value={`${language[key]}`}>
                                    {key}
                                </option>
                            ))}
                        </select> */}
                    </Stack>
                </Stack>
                <Box sx={{ height: "90%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: isLight ? theme.palette.grey[300] : theme.palette.grey[800] }} >
                    <Stack spacing={4} sx={{ mx: { xs: "2rem", md: "5rem" } }}>
                        {/* <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>{sampleData[currentQuestion].title}</Typography>
                        <Typography sx={{ whiteSpace: "pre-line", fontWeight: 300, fontSize: "14px" }}>{sampleData[currentQuestion].question}</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>{sampleData[currentQuestion].subQuestion}</Typography> */}
                        <div dangerouslySetInnerHTML={{ __html: QuestionArr[currentQuestion].question }}></div>
                        <Stack sx={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center" }}>
                            {
                                QuestionArr[currentQuestion].options.map((option, index) => {
                                    return (
                                        <Button key={index} variant="outlined" color="inherit" sx={{ fontSize: "14px" }}
                                            value={option} onClick={evaluateAnswer}>
                                            {option}
                                        </Button>
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Container>
            <QuizDialog dialogInfo={dialogInfo} />
        </Page >

    )
}

export default Quiz;