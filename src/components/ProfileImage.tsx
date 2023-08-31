import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
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

  const styles = StyleSheet.create({
    profile: {
      height: size ?? 32,
      width: size ?? 32,
    },
  });

  return clickable ? (
    <TouchableOpacity
      onPress={() => navigation.navigate("profile" as never)}
      style={style}
    >
      <Image
        style={styles.profile}
        // TODO: Fetch Profile Pic URL
        source={require("../../assets/default-profile.png")}
      />
    </TouchableOpacity>
  ) : (
    <Image
      style={[style, styles.profile]}
      source={require("../../assets/default-profile.png")}
    />
  );
};

export default ProfileImage;
