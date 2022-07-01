import { useState } from "react";
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
};

export default function AlertDialog({ dialogInfo }: Props) {
    const router = useRouter();
    const { dialogStatus, message, setCurrentQuestion, currentQuestion, noOfQuestions } = dialogInfo;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changingQuestion = () => {
        handleClose();
        if (currentQuestion + 1 === noOfQuestions) {
            router.push("/");
        } else {
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
