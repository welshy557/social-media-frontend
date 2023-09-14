import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import COLORS from "../styles/colors";

const Loader = (props: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View style={[style.container, props?.style]}>
      <ActivityIndicator size="large" color={COLORS.Primary} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SurfaceContainer,
  },
});

export default Loader;
