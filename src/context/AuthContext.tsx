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
  user: IUser;
}

interface AuthState {
  token: Token;
  authenticated: Authenticated;
  user: IUser | null;
}
interface AuthProps {
  authState: AuthState;
  setAuthState:
    | React.Dispatch<React.SetStateAction<AuthState>>
    | ((authState: AuthState) => void);
  isLoading: boolean;
  onRegister: (login: Login) => void;
  onLogin: (login: Login) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null, user: null },
  setAuthState: (authState: AuthState) => {},
  isLoading: true,
  onRegister: (login) => {},
  onLogin: (login) => {},
  onLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    user: null,
  });

  // Temp solution to check if users token has expired
  const isAuthenticated = async () => {
    const res = await axios.get("/users");
    return res.status === 200;
  };

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userStr = await SecureStore.getItemAsync("user");

      let user: IUser | null = null;
      if (userStr) user = JSON.parse(userStr);

      axios.defaults.headers.Authorization = token;
      const authenticated = await isAuthenticated();

      setAuthState({ token, authenticated, user });
    } catch (err) {
      // TODO: Remove check for 400 once API returns 401 status code
      if (
        err instanceof AxiosError &&
        (err.response?.status === 401 || err.response?.status === 400)
      ) {
        // Stored token has expired, user must login again
        axios.defaults.headers.Authorization = null;
        setAuthState({ token: null, authenticated: false, user: null });
      }
    }
  };

  useEffect(() => {
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
    setIsLoading(true);
    axios.defaults.headers.Authorization = null;

    try {
      const { user, bearer } = (
        await axios.post<LoginResponse>("/auth/login", login)
      ).data;
      axios.defaults.headers.Authorization = bearer;

      setAuthState({
        token: bearer,
        authenticated: true,
        user,
      });
      await SecureStore.setItemAsync("token", bearer);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
    } catch (err: any) {
      setAuthState({
        token: null,
        authenticated: false,
        user: null,
      });
      if (err instanceof AxiosError && err.response?.status === 401) {
        toast.error("Incorrect username/password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setAuthState({ token: null, authenticated: false, user: null });
    await SecureStore.deleteItemAsync("token");
    axios.defaults.headers.Authorization = null;
  };

  const value = {
    authState,
    setAuthState,
    isLoading: isLoading,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
