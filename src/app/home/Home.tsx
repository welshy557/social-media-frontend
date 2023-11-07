import { StyleSheet, View } from "react-native";
import COLORS from "../../styles/colors";
import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Button from "../../components/Button";
import Posts from "./Post/Posts";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<"explore" | "following">(
    "explore"
  );
  const navigation = useNavigation<any>();

  // Set props on header component
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      ),
    });
  }, [navigation, selectedTab]);

  return (
    <Posts>
      <Button
        text="+"
        textStyle={styles.AddPostText}
        style={styles.AddPostButton}
        onPress={() => navigation.navigate("new-post")}
      ></Button>
    </Posts>
  );
};

const styles = StyleSheet.create({
  AddPostButton: {
    position: "absolute",
    left: "84%",
    top: "85%",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: COLORS.Primary,
  },
  AddPostText: {
    color: "white",
    fontSize: 40,
  },
});

export default Home;
