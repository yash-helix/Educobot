// import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
// import Firebase, { initializeApp } from 'firebase/app';
// import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, AuthProvider, FacebookAuthProvider, GoogleAuthProvider, UserCredential, getAdditionalUserInfo } from 'firebase/auth';
// import { getFirestore, collection, doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
// // @types
// import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/auth';
// //
// import { FIREBASE_API } from '../config';
// // utils
// import axios from '../utils/axios';
// import { isValidToken, setSession } from '../utils/jwt';
// import { PATH_DASHBOARD } from '../routes/paths';
// import { useRouter } from 'next/router';
// // ----------------------------------------------------------------------

// const ADMIN_EMAILS = ['demo@minimals.cc'];

// const firebaseApp = initializeApp(FIREBASE_API);

// const AUTH = getAuth(firebaseApp);

// const DB = getFirestore(firebaseApp);

// const initialState: AuthState = {
//   isAuthenticated: false,
//   isInitialized: false,
//   user: null,
// };

// enum Types {
//   Initial = 'INITIALISE',
// }

// type FirebaseAuthPayload = {
//   [Types.Initial]: {
//     isAuthenticated: boolean;
//     user: AuthUser;
//   };
// };

// type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

// const reducer = (state: AuthState, action: FirebaseActions) => {
//   if (action.type === 'INITIALISE') {
//     const { isAuthenticated, user } = action.payload;
//     return {
//       ...state,
//       isAuthenticated,
//       isInitialized: true,
//       user,
//     };
//   }

//   return state;
// };

// const AuthContext = createContext<FirebaseContextType | null>(null);

// // ----------------------------------------------------------------------

// type AuthProviderProps = {
//   children: ReactNode;
// };
// //export const facebookProvider = new FacebookAuthProvider()
// //export const googleProvider = new GoogleAuthProvider()

// function AuthProvider({ children }: AuthProviderProps) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const router = useRouter();

//   const [profile, setProfile] = useState<any>();
//   let isNewUser: boolean | undefined = false;

//   useEffect(
//     () =>
//       onAuthStateChanged(AUTH, async (user) => {
//         if (user) {
//           //  setProfile(user)
//           dispatch({
//             type: Types.Initial,
//             payload: { isAuthenticated: true, user },
//           });
//         } else {
//           dispatch({
//             type: Types.Initial,
//             payload: { isAuthenticated: false, user: null },
//           });
//         }
//       }),
//     [dispatch]
//   );

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         const accessToken = window.localStorage.getItem('accessToken');
//         // if (accessToken && isValidToken(accessToken)) {
//         if (accessToken) {
//           setSession(accessToken);
//           if (typeof isNewUser !== 'undefined' && !isNewUser) {
//             const response = await axios.get('/api/account/my-account');
//             const { user } = response.data;
//             setProfile(user);
//           }
//           dispatch({
//             type: Types.Initial,
//             payload: {
//               isAuthenticated: true,
//               user: profile,
//             },
//           });
//         } else {
//           dispatch({
//             type: Types.Initial,
//             payload: {
//               isAuthenticated: false,
//               user: null,
//             },
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         dispatch({
//           type: Types.Initial,
//           payload: {
//             isAuthenticated: false,
//             user: null,
//           },
//         });
//       }
//     };
//     initialize();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await axios.post('/users/getSaasUser', {
//       email,
//       password,
//     });

//     const { token, user } = response.data;
//     // console.log(response.data)

//     setSession(token);
//     localStorage.setItem("accessToken", token);
//     // router.push(PATH_DASHBOARD.general.app);
//     //signInWithEmailAndPassword(AUTH, email, password);
//     return user
//   }

//   const register = async(email: string, password: string, firstName: string, lastName: string) =>{

//     // createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
//     //   const userRef = doc(collection(DB, 'users'), res.user?.uid);

//     //   await setDoc(userRef, {
//     //     uid: res.user?.uid,
//     //     email,
//     //     displayName: `${firstName} ${lastName}`,
//     //   });
//     // });

//     const response = await axios.post('/users/saasSignUP', {
//       email,
//       password,
//       fname: firstName,
//       lname: lastName,
//     });
//     const { token, uid } = response.data;
//     // console.log(response.data);

//     localStorage.setItem("accessToken", token);
//   }

//   const socialMediaAuth = async (provider: AuthProvider) => {
//     signInWithPopup(AUTH, provider).then(
//       (res: any) => {
//         const accessToken = (res.user.accessToken);
//         isNewUser = (getAdditionalUserInfo(res)?.isNewUser)
//         setProfile(res.user)
//         setSession(accessToken);
//         return res.user
//       });
//     //signInWithPopup(AUTH, provider).then(res => res);
//   }

//   const logout = () => { setSession(null); return signOut(AUTH); }

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         method: 'firebase',
//         user: {
//           id: state?.user?.uid,
//           email: state?.user?.email,
//           photoURL: state?.user?.photoURL || profile?.photoURL,
//           displayName: state?.user?.displayName || profile?.displayName,
//           role: ADMIN_EMAILS.includes(state?.user?.email) ? 'admin' : 'student',
//           phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
//           country: profile?.country || '',
//           address: profile?.address || '',
//           state: profile?.state || '',
//           city: profile?.city || '',
//           zipCode: profile?.zipCode || '',
//           about: profile?.about || '',
//           isPublic: profile?.isPublic || false,
//         },
//         login,
//         register,
//         logout,
//         socialMediaAuth
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthContext, AuthProvider };

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import Firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
} from "firebase/firestore";
// @types
import {
  ActionMap,
  AuthState,
  AuthUser,
  FirebaseContextType,
} from "../@types/auth";
//
import { FIREBASE_API } from "../config";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
import { id } from "date-fns/locale";
// ----------------------------------------------------------------------

const ADMIN_EMAILS = ["demo@minimals.cc"];

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userType: "",
};

enum Types {
  Initial = "INITIALISE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
      isAuthenticated: boolean;
      user: AuthUser;
      userType: string;
  };
  [Types.Login]: {
      isAuthenticated: boolean;
      user: AuthUser;
      userType: string;
  };
  [Types.Logout]: {
      isAuthenticated: boolean;
      user: AuthUser;
  };
  [Types.Register]: {
      isAuthenticated: boolean;
      user: AuthUser;
  };
};

type FirebaseActions =
  ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === "INITIALISE") {
      const { isAuthenticated, user, userType } = action.payload;
      return {
          ...state,
          isAuthenticated,
          isInitialized: true,
          user,
          userType,
      };
  } else if (action.type === "LOGIN") {
      const { isAuthenticated, user, userType } = action.payload;
      return {
          ...state,
          isAuthenticated,
          isInitialized: true,
          user,
          userType,
      };
  } else if (action.type === "REGISTER") {
      const { isAuthenticated, user } = action.payload;
      return {
          ...state,
          isAuthenticated,
          isInitialized: true,
          user,
      };
  } else if (action.type === "LOGOUT") {
      const { isAuthenticated, user } = action.payload;
      return {
          ...state,
          isAuthenticated,
          isInitialized: false,
          user,
      };
  }
  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};
//export const facebookProvider = new FacebookAuthProvider()
//export const googleProvider = new GoogleAuthProvider()

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState<any>();
  let isNewUser: boolean | undefined = false;

  useEffect(
      () =>
          onAuthStateChanged(AUTH, async (user) => {
              const method = window.localStorage.getItem("method");
              if (!method) return;
              if (user) {
                  dispatch({
                      type: Types.Initial,
                      payload: { isAuthenticated: true, user, userType: "" },
                  });
              } else {
                  dispatch({
                      type: Types.Initial,
                      payload: { isAuthenticated: false, user: null, userType: "" },
                  });
              }
          }),
      [dispatch]
  );

  useEffect(() => {
      const initialize = async () => {
          try {
              const accessToken = window.localStorage.getItem("accessToken");
              const role = window.localStorage.getItem("role");
              const user = window.localStorage.getItem("user");

              if (accessToken && isValidToken(accessToken)) {

                  dispatch({
                      type: Types.Initial,
                      payload: {
                          isAuthenticated: true,
                          user: { userId: user },
                          userType: role
                      },
                  });
              } else {
                  dispatch({
                      type: Types.Initial,
                      payload: {
                          isAuthenticated: false,
                          user: null,
                          userType: ""
                      },
                  });
              }
          } catch (err) {
              console.error(err);
              dispatch({
                  type: Types.Initial,
                  payload: {
                      isAuthenticated: false,
                      user: null,
                      userType: ""
                  },
              });
          }
      };
      initialize();
  }, []);


  const login = async (email: string, password: string) => {
      localStorage.removeItem("method");
      const response = await axios.post("/users/getUser", {
          email,
          password,
      });

      const { token, user, schoolID, userType } = response.data;
      setSession(token, user, schoolID, userType); //user = id

      if (user) {
          setProfile(user);
          dispatch({
              type: Types.Login,
              payload: { isAuthenticated: true, user, userType },
          });
      }
      return user;
  };

  const register = async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
  ) => {
      localStorage.removeItem("method");
      const response = await axios.post("/users/saasSignUP", {
          email,
          password,
          fname: firstName,
          lname: lastName,
      });
      const { token, user } = response.data;
      setSession(token);

      setProfile(user);
      dispatch({
          type: Types.Register,
          payload: { isAuthenticated: true, user },
      });

  };

  const socialMediaAuth = async (provider: AuthProvider) => {
      signInWithPopup(AUTH, provider).then((res: any) => {
          const accessToken = res.user.accessToken;
          isNewUser = getAdditionalUserInfo(res)?.isNewUser;
          setProfile(res.user);
          console.log(res)
          setSession(accessToken);
          window.localStorage.setItem("method", "firebase");
          const user = res.user;
          dispatch({
              type: Types.Login,
              payload: { isAuthenticated: true, user, userType: "" },
          });
          return res.user;
      });
  };

  const logout = () => {
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("schoolID");

      setSession(null);
      dispatch({
          type: Types.Logout,
          payload: { isAuthenticated: false, user: null },
      });
      return signOut(AUTH);
  };
  return (
      <>
          <AuthContext.Provider
              value={{
                  ...state,
                  method: "firebase",
                  user: {
                      id: state?.user?.userID || state?.user?.uid,
                      email: state?.user?.suEmail || state?.user?.email,
                      photoURL: state?.user?.photoURL || profile?.photoURL,
                      displayName: state?.user?.name || profile?.name || state?.userType || state?.user?.displayName,
                      // role: ADMIN_EMAILS.includes(state?.user?.email) ? "admin" : "student",
                      role: state?.userType || "",
                  },
                  login,
                  register,
                  logout,
                  socialMediaAuth,
              }}
          >
              {children}
          </AuthContext.Provider>
      </>
  );
}

export { AuthContext, AuthProvider };
