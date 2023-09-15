import React, { ReactNode } from "react";
import {
  Modal as NativeModal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import DismissableKeyboardView from "./DismissableKeyboardView";

interface CommentsProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  blur?: boolean;
}

const Modal = ({
  visible,
  setVisible,
  children,
  blur = true,
  ...props
}: CommentsProps) => {
  return (
    <NativeModal
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        {blur ? (
          <BlurView intensity={1} style={style.modalOverlay} />
        ) : (
          <View style={style.modalOverlay} />
        )}
      </TouchableWithoutFeedback>

      <DismissableKeyboardView style={props.style}>
        {children}
      </DismissableKeyboardView>
    </NativeModal>
  );
};

const style = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Modal;
