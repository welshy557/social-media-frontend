import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import navigation from "@react-navigation/native";
import axios, { AxiosRequestConfig } from "axios";
import User from "../types/user";

type token = string | null;
type authenticated = boolean | null;

interface login {
  username: string;
  password: string;
}

interface AuthProps {
  authState: { token: token; authenticated: authenticated; user: User | null };
  isLoading: boolean;
  onRegister: (login: login) => void;
  onLogin: (login: login) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null, user: null },
  isLoading: true,
  onRegister: (login) => {},
  onLogin: (login) => {},
  onLogout: () => {},
});

// TODO: Hit /users/:id once implemented on backend
const fetchUser = async () => ((await axios.get("/users")).data as User[])[0];

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthProps["authState"]>({
    token: null,
    authenticated: null,
    user: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        axios.defaults.headers.Authorization = token;
        setAuthState({ token, authenticated: true, user: await fetchUser() });
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const onRegister = (login: login) => {
    try {
      // TODO implement api call to register user
      console.log("register");
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = async (login: login) => {
    try {
      setIsLoading(true);
      const loginRes = await axios.post("/auth/login", login);
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
      console.log(err);
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
    isLoading,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
