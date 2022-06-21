import merge from "lodash/merge";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { IconButton } from "@mui/material";
// components
import ReactApexChart, { BaseOptionChart } from "../../../components/chart";
import DropdownShadow from "./Shadow";

// components
import Iconify from "../../../components/Iconify";
import Icon_download from "../../../assets/icon_download";

// ----------------------------------------------------------------------

interface ChartAreaProps {
  card: {
    title: String;
    CHART_DATA: any;
  };
}

// const StyledCardHeader = styled(CardHeader)({
//   flexDirection: "row",
//   [theme.breakpoints.down("md")]: {
//     flexDirection: "column",
//   },
// });

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem",
  },
}));

export default function AchievementCard(props: ChartAreaProps) {
  const { title, CHART_DATA } = props.card;
  const theme = useTheme();
  const [seriesData, setSeriesData] = useState("Current Year");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setSeriesData(CHART_DATA[index].year);
    setOpen(null);
    // setOpenList(null);
  };

  const handleChangeSeriesData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setSeriesData(Number(event.target.value));
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontWeight: 500,
      fontSize: String(13),
    },
    // tooltip: {
    //   style: {
    //     backgroundColor: "#000",
    //   },
    // },

    colors: [theme.palette.success.dark, theme.palette.warning.main],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  return (
    <Card>
      <StyledCardHeader
        title="Achievement (coins earned)"
        subheader="Last year, you have earned more coins than most students in your age group"
        titleTypographyProps={{ variant: "h5", my: 1 }}
        subheaderTypographyProps={{ variant: "subtitle1" }}
        action={
          <>
            {/* <DropdownShadow
              key="error"
              title={
                <>
                  <Button
                    style={{
                      backgroundColor: theme.palette.grey[200],
                      color: "#000",
                      minWidth: "110px",
                      padding: "6px 0px",
                    }}
                    onClick={handleOpen}
                  >
                    {CHART_DATA[selectedIndex].year}
                    <Iconify
                      icon={
                        isOpen
                          ? "eva:arrow-ios-upward-fill"
                          : "eva:arrow-ios-downward-fill"
                      }
                      sx={{ ml: 0.5, width: 16, height: 16 }}
                    />
                  </Button>
                  <IconButton
                    color="inherit"
                    sx={{ padding: "0px" }}
                    onClick={() => {
                      alert("Download Started");
                    }}
                  >
                    <Icon_download />
                  </IconButton>
                </>
              }
              sx={{
                width: "auto",
                px: 1,
                py: 0.5,
                mx: 0,
                my: 1,
                bgcolor: theme.palette.grey[200],
              }}
            ></DropdownShadow> */}

            <Box
              sx={{
                width: "auto",
                px: 1,
                py: 0.5,
                mx: 0,
                my: 1,
                borderRadius: "5px",
                // color: theme.palette.grey,
                backgroundColor: theme.palette.grey[200],
              }}
            >
              <Button
                style={{
                  backgroundColor: theme.palette.grey[200],
                  color: "#000",
                  minWidth: "110px",
                  padding: "6px 0px",
                }}
                onClick={handleOpen}
              >
                {CHART_DATA[selectedIndex].year}
                <Iconify
                  icon={
                    isOpen
                      ? "eva:arrow-ios-upward-fill"
                      : "eva:arrow-ios-downward-fill"
                  }
                  sx={{ ml: 0.5, width: 16, height: 16 }}
                />
              </Button>
              <IconButton
                color="inherit"
                sx={{ padding: "0px" }}
                onClick={() => {
                  alert("Download Started");
                }}
              >
                <Icon_download />
              </IconButton>
            </Box>

            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={isOpen}
              onClose={handleClose}
              open={Boolean(isOpen)}
            >
              {CHART_DATA.map((option: any, index: any) => (
                <MenuItem
                  key={index}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option.year}
                </MenuItem>
              ))}
            </Menu>
            {/* <TextField
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton color="inherit">
                      <Iconify icon="eva:download-fill" />
                    </IconButton>
                  </>
                ),
              }}
              select
              fullWidth
              value={seriesData}
              SelectProps={{ native: true }}
              onChange={handleChangeSeriesData}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
              sx={{
                "& fieldset": { border: "0 !important" },
                "& select": {
                  pl: 1,
                  py: 0.5,
                  pr: "24px !important",
                  typography: "subtitle2",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0.75,
                  bgcolor: "background.neutral",
                },
                "& .MuiNativeSelect-icon": {
                  top: 4,
                  right: 0,
                  width: 20,
                  height: 20,
                },
              }}
            >
              {CHART_DATA.map((option) => (
                <option key={option.year} value={option.year}>
                  {option.year}
                </option>
              ))}
            </TextField> */}
          </>
        }
      />

      {CHART_DATA.map((item: any) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart
              type="area"
              series={item.data}
              options={chartOptions}
              height={364}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
