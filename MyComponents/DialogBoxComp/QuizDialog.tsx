import { useEffect, useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Rating,
    Box,
    Typography,
} from "@mui/material";

import MotivationIllustration from "../../assets/illustration_motivation";
import SeoIllustration from "../../assets/illustration_seo";
import StarFull from "../../assets/icon_starFull";
import StarDisable from "../../assets/icon_starDisable";
import Icon_StarFullNew from "../../assets/Icon_starFullNew";
import Icon_StarEmptyNew from "../../assets/Icon_starEmptyNew";
import { useRouter } from "next/router";
import axios from "axios";
// ----------------------------------------------------------------------

const StyledRating = styled(Rating)({
    "& .MuiRating-icon": {
        // color: "#fff",
    },
    // "& .MuiRating-iconFilled": {
    //   color: "#fff",
    //   padding: "2px",
    // },
    //   "& .MuiRating-iconHover": {
    //     color: "#000",
    //   },
});

type Props = {
    dialogInfo: {
        dialogStatus: String;
        message: String;
        setCurrentQuestion: any;
        currentQuestion: any;
        noOfQuestions: number;
    };
    lsId:any;
};

export default function AlertDialog({ dialogInfo, lsId }: Props) {
    const router = useRouter();
    const { dialogStatus, message, setCurrentQuestion, currentQuestion, noOfQuestions } = dialogInfo;
    const [open, setOpen] = useState(false);

    // post eval data

    // user details
    const [userDetails, setUserDetails] = useState<any>([]);
    const getUserDetails = async(otp: string | string[]) =>{
        try {
            let formD = new FormData();
            formD.append("sdUID", `${router.query?.user_id}`)

            const userDetails = await axios({
                method: "post",
                url: "https://appssl.educobot.com:8443/EduCobotWS/studentsWS/getStudents",
                data: formD,
                headers: { "Content-Type": "multipart/form-data" },
            });
            {
                let newData = {...userDetails.data.DATA[0], otp}
                setUserDetails(newData)
                console.log("got user details in python")
            }
        }
        catch (error) {
            console.log(error)
            setUserDetails([])
        }
    }
    useEffect(() => {
        router.query.otp && getUserDetails(router.query.otp)
    },[router.query.otp])


    
    //SAVE COINS
    const [coins, setCoins] = useState([]);

            const saveCoins = async (body: any) => {
                // displaying coins logic
                let arr = ['1', '1', '1'];
                setCoins(arr)

                try {
                    const res = await axios({
                        method: "post",
                        url: "https://api.educobot.com/users/postEvalData",
                        data: body,
                        headers: { "Content-Type": "application/json" },
                    });
                    if (res.status == 200 && res.data.msg) {
                        console.log(res.data.msg)
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }


            //POST EVAL DATA
            const postEvalData = async(totalMarks: number) => {
                let body = {
                    "userID": userDetails?.sdUID,
                    "edType": "B",
                    "std": userDetails?.sdClass,
                    "div": userDetails?.sdDiv,
                    "status": "C",
                    "lessonID": lsId,
                    "rollNo": userDetails?.sdRollNo,
                    "pin": userDetails?.otp,
                    "schoolID": userDetails?.sdSchoolID,
                    "edcoins": totalMarks
                }
                await saveCoins(body)
            }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changingQuestion = async() => {
        handleClose();
        if (currentQuestion + 1 === noOfQuestions) {
            await postEvalData(noOfQuestions)
            router.push("/");
            //router.push(`/dashboard/student/StudentOTPLogin/?id=${userDetails?.sdUID}&otp=${router.query.otp}`);
        }
        else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    return (
        <div>
            <Button color="info" variant="outlined" id="quiz_dialog_btn" sx={{ display: "none" }} onClick={handleClickOpen}>
                Open alert dialog
            </Button>

            <Dialog
                open={open}
                BackdropProps={{ invisible: true }}
                PaperProps={{
                    style: {
                        backgroundColor: "#212B36",
                        padding: "0rem 2rem",
                    },
                }}
            // onClose={handleClose}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        fontSize: { md: "20px", xs: "18px" },
                        color: "#fff",
                        padding: { md: "2rem", xs: "2rem 0" },
                        fontWeight: 600,
                    }}
                    fontFamily={"Public Sans"}
                >
                    {dialogStatus === "correct" ? "Correct :)" : "Incorrect :("}
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: "0",
                    }}
                >
                    {dialogStatus === "correct" ?
                        <MotivationIllustration
                            sx={{
                                p: 3,
                                // width: { md: 360, sm: 340, xs: 255 },
                                width: "90%",
                                margin: "auto",
                            }}
                        />
                        :
                        <SeoIllustration
                            sx={{
                                p: 3,
                                // width: { md: 360, sm: 340, xs: 255 },
                                width: "90%",
                                margin: "auto",
                            }}
                        />}

                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            padding: { md: "0rem 1rem", xs: "0rem" },
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "#fff",
                        }}
                        fontFamily={"Public Sans"}
                    >
                        {message}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        padding: "2rem",
                    }}
                >
                    {
                        dialogStatus === "correct" ?
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3366ff",
                                    fontSize: "16px",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontFamily: "Public Sans"
                                }}
                                onClick={changingQuestion}
                                autoFocus
                            >
                                Ok
                            </Button>
                            :
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3366ff",
                                    fontSize: "16px",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontFamily: "Public Sans"
                                }}
                                onClick={handleClose}
                                autoFocus
                            >
                                Try again
                            </Button>
                    }
                </DialogActions>
            </Dialog>

        </div>
    );
}
