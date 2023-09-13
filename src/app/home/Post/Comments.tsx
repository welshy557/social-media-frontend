import React, { useCallback, useEffect, useRef, useState } from "react";
import COLORS from "../../../styles/colors";
import Modal from "../../../components/Modal";
import ProfileImage from "../../../components/ProfileImage";
import Content from "./Content";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AutoExpandingTextInput from "../../../components/AutoExpandingTextInput";
import { Ionicons } from "@expo/vector-icons";
import Replies from "./Replies";

interface CommentsProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comments = ({ visible, setVisible }: CommentsProps) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <Modal visible={visible} setVisible={setVisible} style={style.modalContent}>
      <Content type="comment">
        {showReplies ? (
          <Replies setShowReplies={setShowReplies} />
        ) : (
          <TouchableOpacity onPress={() => setShowReplies(true)}>
            <Text style={style.viewReplies}>View 123 Replies</Text>
          </TouchableOpacity>
        )}
      </Content>

      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.footerContainer}
      >
        <View style={style.footer}>
          <ProfileImage />
          <AutoExpandingTextInput
            autoFocus
            cursorColor="white"
            multiline
            scrollEnabled={false}
            numberOfLines={3}
            placeholder="Add Reply"
            placeholderTextColor="white"
            style={style.input}
          />
          <TouchableOpacity>
            <Ionicons name="send-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  viewReplies: {
    color: COLORS.Primary,
    marginTop: 13,
  },

  footerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLORS.OnSecondaryContainer,
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 18,
    color: "white",
    paddingTop: 3,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 18,
    width: 250,
  },
  modalContent: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "center",
    marginTop: 80,
    flex: 1,
    backgroundColor: COLORS.Secondary,
    borderColor: "grey",
    borderWidth: 0.5,
    borderBottomWidth: 0,
    width: "100%",
  },
});

export default Comments;
