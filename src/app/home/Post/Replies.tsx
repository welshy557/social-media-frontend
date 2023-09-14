import { IReply } from "../../../types";
import Content from "./Content";
import { Text, TouchableOpacity, View } from "react-native";

interface RepliesProps {
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}

const randomUsernames = [
  "happy_cat",
  "lucky_dog",
  "sunny_rabbit",
  "funny_tiger",
  "clever_lion",
  "smart_elephant",
  "friendly_dolphin",
  "jolly_bird",
  "cool_fish",
];

const sampleReply: IReply = {
  userId: "",
  caption:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.",
  createdAt: new Date().toDateString(),
  media: [],
  numLikes: Math.floor(Math.random() * 100) + 1,
  username:
    randomUsernames[Math.floor(Math.random() * randomUsernames.length) + 1],
  postId: "",
};

const Replies = ({ setShowReplies }: RepliesProps) => {
  return (
    <View>
      <Content type="reply" content={sampleReply} />
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
