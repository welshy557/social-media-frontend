import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import Tabs from "./src/app/Tabs";
import Login from "./src/login";
import Register from "./src/register";
import Loader from "./src/components/Loader";
import NewPost from "./src/app/home/NewPost/NewPost";
import NewPostHeader from "./src/app/home/NewPost/NewPostHeader";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./src/context/toast/ToastContext";
import "dotenv/config";

const Stack = createNativeStackNavigator();

const AppEntry = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

const Layout = () => {
  const { authState, isLoading } = useAuth();

  return isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      {authState.authenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="new-post"
            component={NewPost}
            options={{
              animation: "fade_from_bottom",
              header: () => <NewPostHeader post={{ content: "", media: [] }} />,
            }}
          />
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
