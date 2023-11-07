import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
  Platform,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import * as Device from "expo-device";
import moment from "moment";

interface ProfileImageProps {
  url?: string;
  clickable?: boolean;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const ProfileImage = ({
  url,
  size,
  clickable = false,
  style,
}: ProfileImageProps) => {
  const navigation = useNavigation();

  const { authState } = useAuth();

  const styles = StyleSheet.create({
    profile: {
      height: size ?? 48,
      width: size ?? 48,
      borderRadius: 100,
    },
  });

  // TEMP: Check if real device and render default-profile.png
  const source = Device.isDevice
    ? require("../../assets/default-profile.png")
    : url || authState.user
    ? { uri: url ?? authState.user?.profilePicture }
    : require("../../assets/default-profile.png");

  return clickable ? (
    <TouchableOpacity
      onPress={() => navigation.navigate("profile" as never)}
      style={style}
    >
      <Image style={styles.profile} source={source} resizeMode="contain" />
    </TouchableOpacity>
  ) : (
    <Image
      style={[style, styles.profile]}
      source={source}
      resizeMode="contain"
    />
  );
};

export default ProfileImage;
