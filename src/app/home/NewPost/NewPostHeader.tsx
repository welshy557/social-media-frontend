import { SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../../../components/Button";
import COLORS from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import useApi from "../../../hooks/useApi";
import { INewPost } from "../../../types";
import { AxiosHeaders } from "axios";
import { useQueryClient } from "react-query";
import getFileExtension from "../../../util/getFileExtension";
import { useToast } from "../../../context/toast/ToastContext";

interface NewPostHeaderProps {
  post: INewPost;
}

const NewPostHeader = ({ post }: NewPostHeaderProps) => {
  const navigation = useNavigation<any>();
  const api = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", post.content);

      if (post.content.length === 0) {
        toast.error("Post has no caption");
        return;
      }

      post.media.forEach((media, i) => {
        const fileExtension = getFileExtension(media.uri);

        formData.append(`media${i + 1}`, {
          uri: media.uri,
          name: `media${i + 1}.${fileExtension}`,
          type: `${media.type}/${fileExtension}`,
        } as unknown as Blob);
      });

      const res = await api.post("/users/current/post", formData, undefined, {
        "Content-Type": "multipart/form-data",
      } as unknown as AxiosHeaders);

      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        navigation.navigate("home");
        toast.success("Post Created");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.buttonContainer}>
        <Button
          text="Cancel"
          textStyle={style.cancelButtonText}
          style={[style.button, style.cancelButton]}
          onPress={() => navigation.navigate("home")}
        />
        <Button
          text="Post"
          textStyle={style.postButtonText}
          style={[style.button, style.postButton]}
          onPress={createPost}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: COLORS.SurfaceDark,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    height: 30,
    width: 60,
    borderRadius: 10,
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: COLORS.Error,
  },
  cancelButtonText: {
    color: "white",
  },
  postButton: {
    marginRight: 10,
    backgroundColor: COLORS.Primary,
  },
  postButtonText: {
    color: "white",
  },
});

export default NewPostHeader;
