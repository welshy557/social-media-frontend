import { memo } from "react";
import { IPost } from "../../../types";
import Content from "./Content";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import getFileExtension from "../../../util/getFileExtension";
import getMediaType from "../../../util/getMediaType";
import VideoPlayer from "../../../components/VideoPlayer";
import { ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

interface PostProps {
  post: IPost;
  onShowComments: () => void;
}

const renderMedia = ({ item: uri }: ListRenderItemInfo<string>) => {
  const fileExtension = getFileExtension(uri);
  if (!fileExtension) return <View></View>;
  const mediaType = getMediaType(fileExtension);

  if (!mediaType) {
    console.error(`Unsupported File '${fileExtension}`);
    return <View />;
  }

  if (mediaType === "picture")
    return (
      <Image source={{ uri }} height={150} width={150} style={style.media} />
    );
  else
    return (
      <VideoPlayer
        source={{ uri }}
        isLooping
        resizeMode={ResizeMode.STRETCH}
        style={[style.media, { height: 150, width: 150 }]}
      />
    );
};

const Post = ({ post, onShowComments }: PostProps) => {
  return (
    <Content type="post" content={post}>
      <View>
        {post.media && (
          <FlatList
            horizontal={true}
            data={post.media}
            renderItem={renderMedia}
            style={style.mediaList}
          />
        )}
        <View style={style.footer}>
          <TouchableOpacity style={style.addCommentContainer}>
            <FontAwesome name="heart-o" size={24} color="white" />
            <Text style={style.statDetails}>{post.numLikes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShowComments}
            style={style.addCommentContainer}
          >
            <FontAwesome name="comment-o" size={24} color="white" />
            <Text style={style.statDetails}>123</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Content>
  );
};

const style = StyleSheet.create({
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 3,
  },
  addComment: { color: "white", marginLeft: 15 },
  mediaList: {
    marginTop: 10,
    alignSelf: "center",
  },
  media: {
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statDetails: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
});

export default memo(Post);
