import { ActivityIndicator, StyleSheet, View } from "react-native";
import COLORS from "../styles/colors";

const Loader = () => {
  return (
    <View style={style.container}>
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
