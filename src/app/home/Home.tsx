import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import COLORS from "../../styles/colors";
import { useEffect, useMemo, useState } from "react";
import HomeHeader from "./HomeHeader";
import Comments from "./Post/Comments";
import Post from "./Post/Post";
import Button from "../../components/Button";
import { IPost, PaginatedResponse } from "../../types";
import useApi from "../../hooks/useApi";
import Loader from "../../components/Loader";
import { useInfiniteQuery } from "react-query";
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
