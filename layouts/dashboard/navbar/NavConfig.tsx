// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  banking: getIcon("ic_banking"),
  booking: getIcon("ic_booking"),
  invoice: getIcon("ic_invoice"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  curriculum: getIcon("ic_curriculum"),
  shapes: getIcon("ic_shapes"),
  userGroup: getIcon("ic_user_group"),
};

const navConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: "main",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "Reports",
        path: PATH_DASHBOARD.general.reports,
        icon: ICONS.analytics,
      },
      {
        title: "Library",
        path: PATH_DASHBOARD.general.library,
        icon: ICONS.banking,
      },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    items: [
      // USER
      {
        title: "Profile",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.user,
      },

      // SUBSCRIPTION
      {
        title: "subscription",
        path: PATH_DASHBOARD.general.subscription,
        icon: ICONS.cart,
      },

      // INVOICE
      {
        title: "invoice",
        path: PATH_DASHBOARD.general.invoice,
        icon: ICONS.invoice,
      },
    ],
  },
];

const studentConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: "main",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "Curriculum",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.curriculum,
      },
      {
        title: "Library",
        path: PATH_DASHBOARD.general.library,
        icon: ICONS.banking,
      },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    items: [
      // USER
      {
        title: "Profile",
        path: PATH_DASHBOARD.student.demoEdit,
        icon: ICONS.user,
      },
    ],
  },
];

const teacherConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: "main",
    items: [
      // {
      //   title: "Dashboard",
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard,
      // },
      {
        title: "Curriculum",
        path: PATH_DASHBOARD.teacher.curriculum,
        icon: ICONS.curriculum,
      },
      {
        title: "Students",
        path: PATH_DASHBOARD.teacher.list,
        icon: ICONS.userGroup,
      },
      {
        title: "Library",
        path: PATH_DASHBOARD.teacher.new,
        icon: ICONS.banking,
      },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    items: [
      // USER
      {
        title: "Profile",
        path: PATH_DASHBOARD.teacher.demoEdit,
        icon: ICONS.user,
      },
      {
        title: "Classrooms",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.user,
      },
    ],
  },
];

const schoolAdminConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: "main",
    items: [
      {
        title: "Students",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.userGroup,
      },
      {
        title: "Teachers",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.userGroup,
      },
      {
        title: "Classrooms",
        path: PATH_DASHBOARD.general.library,
        icon: ICONS.banking,
      },
      {
        title: "Curriculum",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.curriculum,
      },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    items: [
      // USER
      {
        title: "Profile",
        path: PATH_DASHBOARD.schoolAdmin.demoEdit,
        icon: ICONS.user,
      },
      {
        title: "Subscription",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.cart,
      },
    ],
  },
];

const superAdminConfig = [
  // Main
  // ----------------------------------------------------------------------
  {
    subheader: "main",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "Schools",
        path: PATH_DASHBOARD.superAdmin.list,
        icon: ICONS.banking,
      },
      {
        title: "Saas",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.user,
      },
      {
        title: "Curriculum",
        path: PATH_DASHBOARD.general.curriculum,
        icon: ICONS.curriculum,
      },
    ],
  },

  // Account
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    items: [
      // USER
      {
        title: "Profile",
        path: PATH_DASHBOARD.superAdmin.demoEdit,
        icon: ICONS.user,
      },
      {
        title: "Users",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.user,
      },
      {
        title: "Roles",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.shapes,
      },
      {
        title: "Permissions",
        path: PATH_DASHBOARD.general.profile,
        icon: ICONS.shapes,
      },
    ],
  },
];

export default navConfig;
export { studentConfig, teacherConfig, schoolAdminConfig, superAdminConfig };
