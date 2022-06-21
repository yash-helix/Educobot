import jwtDecode from "jwt-decode";
//
import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const setSession = (accessToken: string | null, user?: any, schoolID?: string, userType?:string) => {
  if (accessToken) {
    window.localStorage.setItem("role", userType);
    localStorage.setItem("accessToken", accessToken);
    user && window.localStorage.setItem("userID", user);
    schoolID && window.localStorage.setItem("schoolID", schoolID);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
