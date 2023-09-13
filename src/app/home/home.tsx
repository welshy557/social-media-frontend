import { View, FlatList, StyleSheet, Text } from "react-native";
import COLORS from "../../styles/colors";
import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import Comments from "./Post/Comments";
import Post from "./Post/Post";
import Button from "../../components/Button";
import NewPost from "./Post/NewPost/NewPost";

const Home = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState<"explore" | "following">(
    "explore"
  );
  const [testArray, setTestArray] = useState(new Array(10));

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      ),
    });
  }, [navigation, selectedTab]);

  return (
    <View style={{ backgroundColor: COLORS.SurfaceDark, flex: 1 }}>
      <View>
        <Comments visible={showComments} setVisible={setShowComments} />
        <FlatList
          data={testArray}
          renderItem={() => (
            <Post onShowComments={() => setShowComments(true)} />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => setTestArray((prev) => [...prev, ...prev])}
        />
      </View>
      <Button
        text="+"
        textStyle={styles.AddPostText}
        style={styles.AddPostButton}
        onPress={() => navigation.navigate("new-post")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  AddPostButton: {
    position: "absolute",
    left: "84%",
    top: "85%",
    flex: 1,
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
