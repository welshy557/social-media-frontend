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

const Home = ({ navigation }: any) => {
  const PAGE_LIMIT = 20;

  const api = useApi();

  const [selectedTab, setSelectedTab] = useState<"explore" | "following">(
    "explore"
  );

  const [showComments, setShowComments] = useState(false);

  // Set props on header component
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      ),
    });
  }, [navigation, selectedTab]);

  const fetchPosts = async (pageParam: number) => {
    const res = await api.get<PaginatedResponse<IPost[]>>("/posts", {
      page: pageParam,
    });
    return res.data.posts ?? [];
  };

  const { data, fetchNextPage, isFetchingNextPage, refetch, isRefetching } =
    useInfiniteQuery(
      "posts",
      async ({ pageParam = 0 }) => await fetchPosts(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage?.length === PAGE_LIMIT ? allPages.length + 1 : undefined;
          return nextPage;
        },
        onError: (err) => {
          console.log("ERROR:");
          console.log(err);
        },
      }
    );

  const memoPostsData = useMemo(() => data?.pages.flat(), [data]);

  const renderPosts = ({ item: post }: ListRenderItemInfo<IPost>) => (
    <Post post={post} onShowComments={() => setShowComments(true)} />
  );

  const memoListRender = useMemo(() => renderPosts, [memoPostsData]);

  return (
    <View style={{ backgroundColor: COLORS.SurfaceDark, flex: 1 }}>
      <View>
        <Comments visible={showComments} setVisible={setShowComments} />
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[COLORS.Primary]}
              refreshing={isRefetching}
            />
          }
          refreshing={isRefetching}
          onRefresh={refetch}
          style={{ height: isFetchingNextPage ? "95%" : "100%" }}
          data={memoPostsData}
          renderItem={memoListRender}
          onEndReachedThreshold={1.5}
          onEndReached={() => fetchNextPage()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isFetchingNextPage ?? (
              <Loader style={{ backgroundColor: COLORS.SurfaceDark }} />
            )
          }
        />
      </View>
      <Button
        text="+"
        textStyle={styles.AddPostText}
        style={styles.AddPostButton}
        onPress={() => navigation.navigate("new-post")}
      ></Button>

      {isFetchingNextPage && (
        <Loader style={{ backgroundColor: "transparent" }} />
      )}
    </View>
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
