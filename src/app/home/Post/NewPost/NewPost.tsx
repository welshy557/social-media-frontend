import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import NewPostHeader from "./NewPostHeader";
import COLORS from "../../../../styles/colors";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Video, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";
import VideoPlayer from "../../../../components/VideoPlayer";

interface VideoRef {
  id: number;
  ref: Video;
}

const MEDIA_UPLOAD_LIMIT = 5;

const NewPost = ({ navigation }: any) => {
  const [postContent, setPostContent] = useState("");
  const [pickedMedia, setPickedMedia] = useState<ImagePickerAsset[]>([]);

  const inputRef = useRef<TextInput>(null);
  const videoRef = useRef<VideoRef[]>([]);

  const [cameraPermStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [imagePermStatus, requestImagePermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <NewPostHeader post={{ content: postContent, media: pickedMedia }} />
      ),
    });
  }, [postContent, pickedMedia]);

  useEffect(() => inputRef.current?.focus(), [inputRef]);

  const pickMedia = async () => {
    if (!imagePermStatus?.granted) await requestImagePermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [16, 9],
      quality: 1,
      selectionLimit: MEDIA_UPLOAD_LIMIT - pickedMedia.length,
    });

    if (!result.canceled && result.assets) {
      setPickedMedia((prev) => [
        ...prev,
        ...(result.assets as ImagePickerAsset[]),
      ]);
    }
  };

  const takeMedia = async () => {
    if (!cameraPermStatus?.granted) await requestCameraPermission();

    let result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedMedia((prev) => [
        ...prev,
        ...(result.assets as ImagePickerAsset[]),
      ]);
    }
  };

  const removeMedia = (index: number) => {
    setPickedMedia((prev) =>
      prev.slice(0, index).concat(prev.slice(index + 1))
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <TextInput
          keyboardType="web-search"
          ref={inputRef}
          style={styles.input}
          multiline
          placeholder="What's to vent about today..."
          placeholderTextColor="lightgrey"
          onChangeText={(txt) => setPostContent(txt)}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.addMediaButton}>
          <TouchableOpacity
            onPress={pickMedia}
            disabled={pickedMedia.length >= MEDIA_UPLOAD_LIMIT}
          >
            <MaterialIcons
              name="add-to-photos"
              size={30}
              color={
                pickedMedia.length >= MEDIA_UPLOAD_LIMIT ? "grey" : "white"
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={pickedMedia}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item: media, index }) => (
              <View>
                {media.type === "image" ? (
                  <Image
                    source={{ uri: media.uri }}
                    height={100}
                    width={100}
                    style={styles.media}
                  />
                ) : (
                  <VideoPlayer
                    style={[styles.media, { height: 100, width: 100 }]}
                    source={{ uri: media.uri }}
                    resizeMode={ResizeMode.STRETCH}
                    isLooping
                  />
                )}
                <TouchableOpacity style={styles.removeMediaButton}>
                  <MaterialIcons
                    name="clear"
                    size={20}
                    color="white"
                    onPress={() => removeMedia(index)}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.takeMediaButton}>
          <TouchableOpacity
            onPress={takeMedia}
            disabled={pickedMedia.length >= MEDIA_UPLOAD_LIMIT}
          >
            <Entypo
              name="camera"
              size={30}
              color={
                pickedMedia.length >= MEDIA_UPLOAD_LIMIT ? "grey" : "white"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SurfaceDark,
  },
  content: {
    flex: 1,
  },
  input: {
    color: "white",
    textAlignVertical: "top",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: Platform.OS === "ios" ? 30 : 15,
    fontSize: 18,
  },

  addMediaButton: {
    marginLeft: 15,
  },
  takeMediaButton: {
    marginRight: 15,
  },
  media: {
    marginLeft: 10,
    marginRight: 10,
  },

  removeMediaButton: {
    position: "relative",
    backgroundColor: COLORS.SurfaceDark,
    bottom: 95,
    left: 85,
    borderRadius: 100,
    height: 20,
    width: 20,
  },

  footer: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  listContainer: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: "70%",
  },
});

export default NewPost;
