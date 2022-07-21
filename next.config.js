/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

const EduCobotBaseUrl = "https://api.educobot.com";
const imageLink = "https://app.educobot.com/liveLessons/thumbNails"

const devUrls = {
  EduCobotBaseUrl,
  imageLink,

  // students
  getStudents:"users/getStudents",
  getUserDetails:"users/getUserDetails",
  getLessonsByPIN4Students:"sessionRoute/getLessonsByPIN4Students",
  getStudentLessonData:"lessonsRoute/getStudentLessonData",
  getStudentsProgress:"lessonsRoute/getStudentsProgress",
  getClosedPinStudentsProgress:"lessonsRoute/getClosedPINStudentsProgress",
  
  // teachers
  getClosePin:"sessionRoute/getClosedPIN",
  getOpenPIN:"sessionRoute/getOpenPIN",
  generateOTP:"sessionRoute/generateOTP",

  //lessons
  getLessonByID:"lessonsRoute/getLessonByID",
  getLessonsByCourse:"lessonsRoute/getLessonsByCourse",
  postOTPLesson:"sessionRoute/postOTPLesson",
  postEvalData:"users/postEvalData",

  //auth
  getUser:"users/getUser",

  // others
  postContactUS:"/users/postContactUS",
}


module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    webAppUrl:"http://localhost:3003",
    webApp:"https://app.educobot.com",
    dashboardUrl:"http://localhost:3001",
    devUrl:devUrls,
    HOST_API_KEY: 'https://api.educobot.com',
    // FIREBASE AUTH
    FIREBASE_API_KEY: 'AIzaSyD7DzkSxY1yJylNNu-hfGUzAFiihcC3WHw',
    FIREBASE_AUTH_DOMAIN: 'educobot.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'educobot',
    FIREBASE_STORAGE_BUCKET: 'educobot.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '793267424550',
    FIREBASE_APPID: '1:793267424550:web:efd0c24a67f2cd130b45e7',
    FIREBASE_MEASUREMENT_ID: "G-1VKNB5JE1S",
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    //
    MAPBOX: '',
  },
});




// https://minimal-assets-api.vercel.app