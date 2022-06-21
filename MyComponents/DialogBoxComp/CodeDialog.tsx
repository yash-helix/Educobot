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
import MaintenanceIllustration from "../../assets/illustration_maintenance";
import StarFull from "../../assets/icon_starFull";
import StarDisable from "../../assets/icon_starDisable";
import Icon_StarFullNew from "../../assets/Icon_starFullNew";
import Icon_StarEmptyNew from "../../assets/Icon_starEmptyNew";
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
    title: String;
    subTitle: String;
  };
};
export default function AlertDialog({ dialogInfo }: Props) {
  const { dialogStatus, title, subTitle } = dialogInfo;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="info" variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center", fontSize: "18px" }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {dialogStatus === "start" || dialogStatus === "success" ? (
            <MotivationIllustration
              sx={{
                p: 3,
                width: { md: 360, sm: 340, xs: 280 },
                margin: "auto",
              }}
            />
          ) : (
            <MaintenanceIllustration
              sx={{
                p: 3,
                width: { md: 360, sm: 340, xs: 280 },
                margin: "auto",
              }}
            />
          )}

          {dialogStatus === "success" && (
            <Box
              sx={{
                display: "block",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="subtitle1"
                fontFamily={"Public Sans"}
                sx={{ marginBottom: "0.2rem" }}
              >
                {`Coins earned`}
              </Typography>

              <StyledRating
                name="read-only"
                value={3.5}
                precision={0.5}
                style={{
                  width: "140px",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "auto",
                }}
                icon={<Icon_StarFullNew width={24} height={24} />}
                emptyIcon={<Icon_StarEmptyNew width={24} height={24} />}
                readOnly
              />
              {/* // <StyledRating
              //   name="read-only"
              //   value={4.5}
              //   precision={0.5}
              //   icon={<Icon_StarFullNew width={24} height={24} />}
              //   emptyIcon={<Icon_StarEmptyNew width={24} height={24} />}
              //   readOnly
              // /> */}
            </Box>
          )}

          {/* <DialogContentText
            sx={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            {subTitle}
          </DialogContentText> */}
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", padding: "0rem 1rem", fontWeight: 400 }}
            fontFamily={"Public Sans"}
          >
            {subTitle}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {dialogStatus === "start" && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3366ff",
                  fontSize: "16px",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                onClick={handleClose}
                autoFocus
              >
                Learn more about eduCOBOT
              </Button>
            </>
          )}
          {dialogStatus === "exit" && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClose}
                sx={{
                  fontSize: "16px",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Exit
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3366ff",
                  fontSize: "16px",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                onClick={handleClose}
                autoFocus
              >
                Dont exit
              </Button>
            </>
          )}
          {dialogStatus === "success" && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3366ff",
                  fontSize: "16px",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                onClick={handleClose}
                autoFocus
              >
                Go to dashboard
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
