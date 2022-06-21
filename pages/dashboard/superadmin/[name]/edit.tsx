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
import SuperAdminEditForm from "../../../../sections/@dashboard/superadmin/SuperAdminEditForm";

// ----------------------------------------------------------------------

SuperAdminEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SuperAdminEdit() {
  const { themeStretch } = useSettings();

  //   const { query } = useRouter();

  //   const { name } = query;

  // const currentSchoolAdmin = _userList.find((user) => paramCase(user.name) === name);

  const currentSuperAdmin = {
    firstName: "Ketan",
    middleName: "",
    lastName: "Patel",
    email: "ketanpatel@email.com",
    phone: "9880098800",
    address: "pune",
    avatarUrl:
      "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_24.jpg",
    isVerified: false,
  };

  // const currentSchoolAdmin = {};
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
        <SuperAdminEditForm isEdit currentSuperAdmin={currentSuperAdmin} />
      </Container>
    </Page>
  );
}
