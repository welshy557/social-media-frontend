import { View, Text, StyleSheet, Animated } from "react-native";
import { Toast } from "./ToastContext";
import { useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";

const ToastComponent = ({ toast }: { toast: Toast }) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const progressAnimation = useRef(new Animated.Value(100)).current;

  const progressBarWidth = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const SUCCESS = "rgb(34 197 94)";
  const INFO = "rgb(37 99 235);";
  const ERROR = "rgb(220 38 38)";

  const color =
    toast.type === "success" ? SUCCESS : toast.type === "info" ? INFO : ERROR;

  const icon =
    toast.type === "success"
      ? "check-circle"
      : toast.type === "info"
      ? "info"
      : "x-circle";

  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: "#F5F5F5",
      opacity: toast.duration > 0 ? fadeInAnim : fadeOutAnim,
    },
    content: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 10,
      paddingRight: 10,
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      color: color,
      flexWrap: "wrap",
    },
    icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    progressBar: {
      backgroundColor: color,
      height: 3,
      width: progressBarWidth,
      alignSelf: "flex-start",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
  });

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(progressAnimation, {
      toValue: 0,
      duration: toast.duration * 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (toast.duration === 0) {
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [toast.duration]);

  return (
    <View>
      <Animated.View style={style.container}>
        <View style={style.content}>
          <Feather name={icon} style={style.icon} size={24} color={color} />
          <Text style={style.text}>{toast.text}</Text>
          <View style={{ height: "100%", backgroundColor: "grey" }} />
        </View>

        <Animated.View style={style.progressBar} />
      </Animated.View>
    </View>
  );
};

export default ToastComponent;
