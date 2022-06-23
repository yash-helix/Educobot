// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Stack } from "@mui/material";
// hooks
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// layouts
import Layout from "../../layouts";
// components
import Page from "../../components/Page";
import CourseCards from "../../MyComponents/Dashboard/CourseCards";
import RewardsComponent from "../../MyComponents/Dashboard/RewardsComponent";

import DashWelcome from "../../MyComponents/DashBoardCardComp/DashWelcome";
//importing SyllabusCard
import SyllabusCard from "../../MyComponents/DashBoardCardComp/SyllaBusCardComp/SyllabusCard";
//importing AchievementCard
import AchievementCard from "../../MyComponents/DashBoardCardComp/AchievementCardComp/AchievementCard";
//import CodeDialog
import CodeDialog from "../../MyComponents/DialogBoxComp/CodeDialog";
import { useRouter } from "next/router";
// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const router = useRouter();

  const theme = useTheme();

  const { themeStretch } = useSettings();

  // return (
  //     <Page title="General: App">
  //             <CourseCards/>
  //             <RewardsComponent/>
  //     </Page>
  // );
  // return (
  //     <Page title="General: App">
  //         <Container maxWidth={themeStretch ? false : 'xl'}>
  //             <CourseCards/>
  //         </Container>
  //     </Page>
  // );
    return (
      <Page title="General: App">
        {console.log(user)}
        {/* student dashboard */}
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashWelcome />
            </Grid>
            <Grid item xs={12}>
              <CourseCards />
            </Grid>

            {/* donut */}
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <SyllabusCard
                card={{
                  title:
                    "You have completed more than expexted since March 2021. Awesome : )",
                  chartData: [75, 50],
                  labels: ["Completed", "Benchmark"],
                  total: 100,
                }}
              />
            </Grid> */}

            <Grid item xs={12} md={12} lg={12}>
              <AchievementCard
                card={{
                  title:
                    "Last year, you have earned more coins than most students in your age group ",
                  CHART_DATA: [
                    {
                      year: "Last Week",
                      data: [
                        {
                          name: "My Coins",
                          data: [10, 41, 35, 45],
                        },
                        {
                          name: "Average Coins earned in my age group",
                          data: [10, 34, 13, 56],
                        },
                      ],
                    },
                    {
                      year: "Last Month",
                      data: [
                        {
                          name: "My Coins",
                          data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 49, 51, 35],
                        },
                        {
                          name: "Average Coins earned in my age group",
                          data: [45, 77, 99, 88, 77, 56, 13, 34, 10, 49, 51, 35],
                        },
                      ],
                    },
                    {
                      year: "Last 6 Months",
                      data: [
                        {
                          name: "My Coins",
                          data: [148, 95, 69, 70, 49, 49, 56, 67, 51, 35, 41, 15],
                        },
                        {
                          name: "Average Coins earned in my age group",
                          data: [45, 77, 99, 49, 51, 35, 88, 77, 56, 13, 34, 10],
                        },
                      ],
                    },
                    {
                      year: "Last Year",
                      data: [
                        {
                          name: "My Coins",
                          data: [148, 91, 63, 62, 49, 49, 57, 35, 51, 25, 48, 10],
                        },
                        {
                          name: "Average Coins earned in my age group",
                          data: [45, 77, 99, 49, 51, 35, 88, 77, 56, 13, 34, 10],
                        },
                      ],
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <RewardsComponent />
            </Grid>
            {/* <Grid item xs={12}>
            <CodeDialog
              dialogInfo={{
                dialogStatus: "start",
                title: "Code written successfully : )",
                subTitle:
                  "Hope you liked doing this lesson on eduCOBOT that takes you on a journey from no code to data science.",
              }}
              // dialogInfo={{
              //   dialogStatus: "exit",
              //   title: "Exit lesson ?",
              //   subTitle:
              //     "Your lesson is incomplete and exiting now will mean you will loose your work done so far.",
              // }}
              // dialogInfo={{
              //   dialogStatus: "success",
              //   title: "Code written successfully : )",
              //   subTitle:
              //     "With this lesson, you have learned the basics of <tag1>, <tag2> and <tag3>. ",
              // }}
            />
          </Grid> */}
          </Grid>
        </Container>
      </Page>
    )
}
