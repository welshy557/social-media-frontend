import { View, FlatList, SafeAreaView } from "react-native";
import COLORS from "../../styles/colors";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "./HomeHeader";
import Comments from "./Post/Comments";
import Post from "./Post/post";

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
    <SafeAreaView style={{ backgroundColor: COLORS.SurfaceDark, flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default Home;
