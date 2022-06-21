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
import SaasStudentEditForm from "../../../../sections/@dashboard/saasstudent/SaasStudentEditForm";

// ----------------------------------------------------------------------

SaasStudentEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SaasStudentEdit() {
  const { themeStretch } = useSettings();

  //   const { query } = useRouter();

  //   const { name } = query;

  // const currentUser = _userList.find((user) => paramCase(user.name) === name);

  const currentUser = {
    firstName: "Test First Name",
    middleName: "Test Middle Name",
    lastName: "Test Last Name",
    dob: new Date("Mon May 31 2021 00:00:00 GMT+0530 (India Standard Time)"),
    gender: "1",
    email: "test@gmail.com",
    phone: "9856455689",
    address: "pune",
    parentFirstName: "Test Parent First Name",
    parentLastName: "Test Parent Last Name",
    parentEmail: "testparent@gmail.com",
    parentPhone: "9856458956",
    relationship: "1",
    schoolName: "abcd",
    board: "1",
    class: "10th",
    avatarUrl:
      "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_24.jpg",
    isVerified: false,
  };

  // const currentUser = {};
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
        <SaasStudentEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}
