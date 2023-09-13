import { SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../../../../components/Button";
import COLORS from "../../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

export interface NewPostHeaderProps {
  postContent: string;
}

const NewPostHeader = ({ postContent }: NewPostHeaderProps) => {
  const navigation = useNavigation<any>();

  const handlePost = () => {
    // TODO: Make requset to API
    console.log(postContent);
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
          onPress={handlePost}
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
