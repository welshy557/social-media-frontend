import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";

const DismissableKeyboardView = (props: ViewProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Keyboard.isVisible()) Keyboard.dismiss();
      }}
    >
      <View style={props.style}>{props.children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissableKeyboardView;
