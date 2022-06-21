import { paramCase, capitalCase } from "change-case";
// // next
// import { useRouter } from "next/router";
// @mui
import { Container } from "@mui/material";
// // routes
// import { PATH_DASHBOARD } from "../../../../routes/paths";
// hooks
import useSettings from "../../../../hooks/useSettings";
// // _mock_
// import { _userList } from "../../../../_mock";
// // layouts
import Layout from "../../../../layouts";
// components
import Page from "../../../../components/Page";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
// sections
import TeacherEditForm from "../../../../sections/@dashboard/teacher/TeacherEditForm";

// ----------------------------------------------------------------------

TeacherEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TeacherEdit() {
  const { themeStretch } = useSettings();

  //   const { query } = useRouter();

  //   const { name } = query;

  // const currentTeacher = _userList.find((user) => paramCase(user.name) === name);

  const currentTeacher = {
    firstName: "Pallavi",
    middleName: "",
    lastName: "Surana",
    email: "pallavisurana@email.com",
    phone: "9856455689",
    address: "pune",
    schoolName: "MIT",
    classDetails: [
      {
        standard: 9,
        division: "B",
        noOfStudents: 55,
      },
      {
        standard: 8,
        division: "C",
        noOfStudents: 45,
      },
      {
        standard: 7,
        division: "A",
        noOfStudents: 155,
      },

      {
        standard: 6,
        division: "D",
        noOfStudents: 105,
      },

      {
        standard: 5,
        division: "C",
        noOfStudents: 55,
      },
      {
        standard: 9,
        division: "B",
        noOfStudents: 55,
      },
      {
        standard: 8,
        division: "C",
        noOfStudents: 45,
      },
    ],
    avatarUrl:
      "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_24.jpg",
    isVerified: false,
  };

  // const currentTeacher = {};
  return (
    <Page title="User: Edit user">
      <Container maxWidth={themeStretch ? false : "lg"}>
        {/* <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.list },
            { name: capitalCase(name as string) },
          ]}
        /> */}
        <TeacherEditForm isEdit currentTeacher={currentTeacher} />
      </Container>
    </Page>
  );
}
