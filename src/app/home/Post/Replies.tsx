import Content from "./Content";
import { Text, TouchableOpacity, View } from "react-native";

interface RepliesProps {
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}

const Replies = ({ setShowReplies }: RepliesProps) => {
  return (
    <View>
      <Content type="reply" />
      <TouchableOpacity onPress={() => setShowReplies(false)}>
        <Text
          style={{
            color: "white",
            marginLeft: "5%",
            marginTop: 5,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          Close Replies
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Replies;
