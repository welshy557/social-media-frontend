import React, { ReactNode } from "react";
import {
  Modal as NativeModal,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import DismissableKeyboardView from "./DismissableKeyboardView";

interface ModalProps {
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
}: ModalProps) => {
  return (
    <NativeModal
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        {blur ? (
          <BlurView
            intensity={1}
            style={{ flex: 1, justifyContent: "flex-end", marginTop: 15 }}
          >
            <DismissableKeyboardView style={props.style}>
              {children}
            </DismissableKeyboardView>
          </BlurView>
        ) : (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <DismissableKeyboardView style={props.style}>
              {children}
            </DismissableKeyboardView>
          </View>
        )}
      </TouchableWithoutFeedback>
    </NativeModal>
  );
};

export default Modal;
