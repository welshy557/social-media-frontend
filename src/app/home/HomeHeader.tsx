import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../styles/colors";
import { Dispatch, SetStateAction } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export interface HomeHeaderProps {
  selectedTab?: "explore" | "following";
  setSelectedTab:
    | Dispatch<SetStateAction<"explore" | "following">>
    | (() => void);
}

const HomeHeader = ({ selectedTab, setSelectedTab }: HomeHeaderProps) => {
  const isSelected = (tab: HomeHeaderProps["selectedTab"]) =>
    tab === selectedTab
      ? { text: style.textSelected, bar: style.barSelected }
      : { text: style.textUnselected, bar: style.barUnselected };

  return (
    <SafeAreaView style={style.container}>
      <View>
        {/* <ProfileImage clickable style={style.profileImage} /> */}

        <View style={style.tabContainer}>
          <TouchableOpacity
            style={style.tabContent}
            onPress={() => setSelectedTab("explore")}
          >
            <Text style={isSelected("explore").text}>Explore</Text>
            <View style={[style.tabBar, isSelected("explore").bar]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={style.tabContent}
            onPress={() => setSelectedTab("following")}
          >
            <Text style={isSelected("following").text}>Following</Text>
            <View style={[style.tabBar, isSelected("following").bar]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.line} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SurfaceDark,
  },
  content: {},
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tabContent: {
    alignItems: "center",
    marginRight: 65,
    marginLeft: 65,
  },
  tabBar: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 1,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  textSelected: { color: COLORS.Primary },
  barSelected: { backgroundColor: COLORS.Primary },

  textUnselected: { color: COLORS.OnSurfaceVariant },
  barUnselected: { backgroundColor: COLORS.SurfaceDark },
  line: { paddingTop: 0.3, backgroundColor: "white" },
  profileImage: {
    marginLeft: 20,
    alignSelf: "flex-start",
  },
});

export default HomeHeader;
