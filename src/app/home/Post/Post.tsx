import ProfileImage from "../../../components/ProfileImage";
import Content from "./Content";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostProps {
  onShowComments: () => void;
}

const Post = ({ onShowComments }: PostProps) => {
  return (
    <Content type="post">
      <TouchableOpacity onPress={onShowComments}>
        <View style={style.addCommentContainer}>
          <ProfileImage size={15} />
          <Text style={style.addComment}>Add Comment...</Text>
        </View>
      </TouchableOpacity>
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
});

export default Post;
