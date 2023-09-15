import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios, { AxiosError } from "axios";
import { IUser } from "../types";
import useApi from "../hooks/useApi";
import { useToast } from "./toast/ToastContext";

type Token = string | null;
type Authenticated = boolean | null;

interface Login {
  username: string;
  password: string;
}

interface LoginResponse {
  bearer: string;
  user?: IUser; // Not implemented on API
}

interface AuthProps {
  authState: { token: Token; authenticated: Authenticated; user: IUser | null };
  isLoading: boolean;
  onRegister: (login: Login) => void;
  onLogin: (login: Login) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null, user: null },
  isLoading: true,
  onRegister: (login) => {},
  onLogin: (login) => {},
  onLogout: () => {},
});

// TODO: Remove once POST /auth/login returns logged in user
const fetchUser = async () => ((await axios.get("/users")).data as IUser[])[0];

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const api = useApi();
  const toast = useToast();

  const [authState, setAuthState] = useState<AuthProps["authState"]>({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          axios.defaults.headers.Authorization = token;
          setAuthState({ token, authenticated: true, user: await fetchUser() });
        }
      } catch (err) {
        // TODO: Remove check for 400 once API returns 401 status code
        if (err instanceof AxiosError && err.response?.status === 401) {
          // Stored token has expired, user must login again
          axios.defaults.headers.Authorization = null;
          setAuthState({ token: null, authenticated: false, user: null });
        }
      }
    };

    checkToken();
  }, []);

  const onRegister = (login: Login) => {
    try {
      // TODO implement api call to register user
      console.log("register");
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = async (login: Login) => {
    try {
      const loginRes = await api.post<Login, LoginResponse>(
        "/auth/login",
        login
      );
      axios.defaults.headers.Authorization = loginRes.data.bearer;

      const user = await fetchUser();
      setAuthState({
        token: loginRes.data.bearer,
        authenticated: true,
        user,
      });
      await SecureStore.setItemAsync("token", loginRes.data.bearer);
    } catch (err: any) {
      setAuthState({
        token: null,
        authenticated: false,
        user: null,
      });
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error("Incorrect username/password");
      }
    }
  };

  const onLogout = async () => {
    setAuthState({ token: null, authenticated: false, user: null });
    await SecureStore.deleteItemAsync("token");
    axios.defaults.headers.Authorization = null;
  };

  const value = {
    authState,
    isLoading: api.isLoading,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
