// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  forgotPassword: path(ROOTS_AUTH, "/forgotPassword"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_PAGE = {
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",

  product: "/product",
  curriculum: "/curriculum",
  library: "/library",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    reports: path(ROOTS_DASHBOARD, "/reports"),
    library: path(ROOTS_DASHBOARD, "/library"),
    subscription: path(ROOTS_DASHBOARD, "/subscription"),
    invoice: path(ROOTS_DASHBOARD, "/invoice"),
    profile: path(ROOTS_DASHBOARD, "/profile"),
    curriculum: path(ROOTS_DASHBOARD, "/curriculum"),
    test: path(ROOTS_DASHBOARD, "/testFile"),
  },
  student: {
    root: path(ROOTS_DASHBOARD, "/student/"),
    demoEdit: path(ROOTS_DASHBOARD, `/student/ashutosh/edit`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/student/${name}/edit`),
    // list: path(ROOTS_DASHBOARD, `/student/list`),
  },
  teacher: {
    root: path(ROOTS_DASHBOARD, "/teacher/curriculum"), //need be change in future
    demoEdit: path(ROOTS_DASHBOARD, `/teacher/ashutosh/edit`),
    list: path(ROOTS_DASHBOARD, `/teacher/studentlist`),
    new: path(ROOTS_DASHBOARD, "/teacher/new"),
    curriculum: path(ROOTS_DASHBOARD, "/teacher/curriculum"),
    viewProgress:path(ROOTS_DASHBOARD, "/teacher/viewProgress"),
    viewReport:path(ROOTS_DASHBOARD, "/teacher/viewReport"),
  },
  schoolAdmin: {
    root: path(ROOTS_DASHBOARD, "/schooladmin"),
    demoEdit: path(ROOTS_DASHBOARD, `/schooladmin/ashutosh/edit`),
    new: path(ROOTS_DASHBOARD, "/schooladmin/new"),
  },
  superAdmin: {
    root: path(ROOTS_DASHBOARD, "/superadmin"),
    demoEdit: path(ROOTS_DASHBOARD, `/superadmin/ashutosh/edit`),
    new: path(ROOTS_DASHBOARD, "/superadmin/new"),
    list: path(ROOTS_DASHBOARD, `/superadmin/schoollist`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/superadmin/${name}/edit`),
  },
  // user: {
  //   root: path(ROOTS_DASHBOARD, "/user"),
  //   demoEdit: path(ROOTS_DASHBOARD, `/user/ashutosh/edit`),
  //   // edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  //   new: path(ROOTS_DASHBOARD, "/user/new"),
  //   // list: path(ROOTS_DASHBOARD, "/user/list"),
  //   // cards: path(ROOTS_DASHBOARD, "/user/cards"),
  //   // profile: path(ROOTS_DASHBOARD, "/user/profile"),
  //   // account: path(ROOTS_DASHBOARD, "/user/account"),

  //   // demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  // },
  /*  mail: {
          root: path(ROOTS_DASHBOARD, '/mail'),
          all: path(ROOTS_DASHBOARD, '/mail/all'),
      },
      chat: {
          root: path(ROOTS_DASHBOARD, '/chat'),
          new: path(ROOTS_DASHBOARD, '/chat/new'),
          view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
      },
      calendar: path(ROOTS_DASHBOARD, '/calendar'),
      kanban: path(ROOTS_DASHBOARD, '/kanban'),
      
      subscription: {
          root: path(ROOTS_DASHBOARD, '/subscription'),
          shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
          list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
          checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
          new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
          view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
          edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
          demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
          demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
      },
      invoice: {
          root: path(ROOTS_DASHBOARD, '/invoice'),
          list: path(ROOTS_DASHBOARD, '/invoice/list'),
          new: path(ROOTS_DASHBOARD, '/invoice/new'),
          view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
          edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
          demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
          demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
      },*/
  // blog: {
  //     root: path(ROOTS_DASHBOARD, '/blog'),
  //     posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //     new: path(ROOTS_DASHBOARD, '/blog/new'),
  //     view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  //     demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  // },
};

export const PATH_DOCS = "/contact-us";
