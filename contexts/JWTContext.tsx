import { createContext, ReactNode, useEffect, useReducer } from "react";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from "../@types/auth";

// ----------------------------------------------------------------------

enum Types {
  Initial = "INITIALIZE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    userType:string;
  };
  [Types.Login]: {
    user: AuthUser;
    userType:string;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions =
  ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userType:null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        userType: action.payload.userType,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/api/account/my-account");
          const { user, userType } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
              userType,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
              userType:null,
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
            userType:null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    // api/account/login
    const response = await axios.post("/api/account/login", {
      email,
      password,
    });
    const { accessToken, user, userType } = response.data;

    setSession(accessToken);

    dispatch({
      type: Types.Login,
      payload: {
        user,
        userType,
      },
    });
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    // /api/account/register
    const response = await axios.post("users/saasSignUP", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
