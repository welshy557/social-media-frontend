import {
  View,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ViewProps,
} from "react-native";
import COLORS from "../../../styles/colors";
import { useMemo, useState } from "react";
import Comments from "../Post/Comments";
import Post from "../Post/Post";
import { IPost, PaginatedResponse } from "../../../types";
import useApi from "../../../hooks/useApi";
import Loader from "../../../components/Loader";
import { useInfiniteQuery } from "react-query";

const Posts = (props: ViewProps) => {
  const PAGE_LIMIT = 20;

  const api = useApi();

  const [showComments, setShowComments] = useState(false);

  const fetchPosts = async (pageParam: number) => {
    const res = await api.get<PaginatedResponse<IPost[]>>("/posts", {
      page: pageParam,
    });
    return res.data.data ?? [];
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
      {isFetchingNextPage && (
        <Loader style={{ backgroundColor: "transparent" }} />
      )}
      {props.children}
    </View>
  );
};

export default Posts;
