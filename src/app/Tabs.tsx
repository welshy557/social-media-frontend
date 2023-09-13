import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "./home/home";
import Profile from "./profile/profile";
import HomeHeader from "./home/HomeHeader";
import COLORS from "../styles/colors";
import { Entypo } from "@expo/vector-icons";
import { Header } from "react-native/Libraries/NewAppScreen";
import ProfileHeader from "./profile/profileHeader";
import ProfileImage from "../components/ProfileImage";
import NewPost from "./home/Post/NewPost/NewPost";

type TabParamList = {
  home: undefined;
  profile?: { userId: string };
};

const Tab = createBottomTabNavigator<TabParamList>();
const TAB_ICON_SIZE = 24;

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.SurfaceContainer },
        tabBarActiveTintColor: COLORS.Primary,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          header: () => <HomeHeader setSelectedTab={() => {}} />,
          tabBarIcon: () => (
            <Entypo name="home" size={TAB_ICON_SIZE} color={COLORS.OnSurface} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          header: () => <ProfileHeader />,
          tabBarIcon: () => <ProfileImage size={TAB_ICON_SIZE} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
