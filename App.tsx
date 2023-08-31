import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Expo from "expo";
import { AppRegistry, View, Text, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import App from "./src/app";
import Login from "./src/login";
import Register from "./src/register";
import axios from "axios";
import Loader from "./src/components/Loader";

const Stack = createNativeStackNavigator();

const AppEntry = () => {
  // Set Axios Defaults
  axios.defaults.baseURL = "http://192.168.2.15:9090";

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState, isLoading } = useAuth();

  return isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      {authState.authenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="app" component={App} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppEntry;
