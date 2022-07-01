import React, { useState } from 'react'
import { Typography, Container, Stack, Button, Box, useTheme } from "@mui/material";
// components
import Page from "../../../components/Page";
// hooks
import useSettings from "../../../hooks/useSettings";
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router';
import styles from "../../../styles/Home.module.css";
import QuizDialog from '../../../MyComponents/DialogBoxComp/QuizDialog';

const sampleData = [
    {
        id: 1,
        title: "",
        question: `________ are special words understood by python`,
        subQuestion: ``,
        options: ["Keywords", "Special Words"],
        correct_answer: "Keywords",
        correct_msg: "1 correct_msg",
        incorrect_msg: "1 incorrect_msg",
    }, {
        id: 2,
        title: "Let’s learn naming rules.",
        question: `Naming rule #1:  A variable name cannot start with a number.
    
    9a = 9`,
        subQuestion: `Is this correct?`,
        options: ["Yes", "No"],
        correct_answer: "Yes",
        correct_msg: "2 correct_msg",
        incorrect_msg: "2 incorrect_msg",
    }, {
        id: 3,
        title: "The 4 naming rules are:",
        question: `•	A variable name must start with a letter or underscore character. 

        •	A variable name cannot start with a number. 

        •	A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9 and _) 
        
        •	Variable names are case sensitive (age, Age and AGE are three different variables)`,
        subQuestion: ``,
        options: ["Yes", "No"],
        correct_answer: "Yes",
        correct_msg: "3 correct_msg",
        incorrect_msg: "3 incorrect_msg",
    }, {
        id: 4,
        title: "",
        question: `What is a type casting in python?`,
        subQuestion: ``,
        options: ["Change Data Type Property", "Declaration of Data Type"],
        correct_answer: "Change Data Type Property",
        correct_msg: "4 correct_msg",
        incorrect_msg: "4 incorrect_msg",
    }, {
        id: 5,
        title: "Select the right order.",
        question: `print_  ______  _ _`,
        subQuestion: ``,
        options: ["“ )( ” Hello", " (Hello) ", " )Hello( ", "( “ Hello ” )"],
        correct_answer: "( “ Hello ” )",
        correct_msg: "5 correct_msg",
        incorrect_msg: "5 incorrect_msg",
    }];


const Quiz = () => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    const router = useRouter();
    const language = { English: 1, Hindi: 2, Marathi: 3, Spanish: 4, Arabic: 5, Swaheli: 6 }
    const [lang, setLang] = useState(1);
    const { themeStretch } = useSettings();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dialogInfo, setDialogInfo] = useState({ dialogStatus: "correct", message: sampleData[currentQuestion].correct_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: sampleData.length });



    function onChange(e) {
        setLang(parseInt(e.target.value))
    }

    function evaluateAnswer(event) {
        let selectedAnswer = event.target.value;
        if (sampleData[currentQuestion].correct_answer === selectedAnswer) {
            // setCurrentQuestion(currentQuestion + 1)
            setDialogInfo({ dialogStatus: "correct", message: sampleData[currentQuestion].correct_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: sampleData.length });
        } else {
            // console.log(currentQuestion)
            setDialogInfo({ dialogStatus: "incorect", message: sampleData[currentQuestion].incorrect_msg, setCurrentQuestion: setCurrentQuestion, currentQuestion: currentQuestion, noOfQuestions: sampleData.length });
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
                        <Typography component={"span"} sx={{ fontWeight: "700", fontSize: "18px" }}>About special words</Typography> -  Please provide your answer
                    </Typography>

                    <Stack sx={{ display: "inline" }}>
                        <select
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
                        </select>
                    </Stack>
                </Stack>
                <Box sx={{ height: "90%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: isLight ? theme.palette.grey[300] : theme.palette.grey[800] }} >
                    <Stack spacing={4} sx={{ mx: { xs: "2rem", md: "5rem" } }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>{sampleData[currentQuestion].title}</Typography>
                        <Typography sx={{ whiteSpace: "pre-line", fontWeight: 300, fontSize: "14px" }}>{sampleData[currentQuestion].question}</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>{sampleData[currentQuestion].subQuestion}</Typography>
                        <Stack sx={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "center" }}>
                            {
                                sampleData[currentQuestion].options.map((option, index) => {
                                    return (
                                        <Button key={index} variant="outlined" color="inherit" sx={{ fontSize: "14px" }} value={option} onClick={evaluateAnswer}>
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