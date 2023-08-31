import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileImage from "../../../components/ProfileImage";
import { ReactElement, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const sampleText = `SDFSDFsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffSDFSDFsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`;

interface ContentProps {
  type: "post" | "comment" | "reply";
  children?: ReactElement;
}

const Content = ({ type, children }: ContentProps) => {
  const navigation = useNavigation();
  const [showMore, setShowMore] = useState(false);

  const maxNumberOfCharacters = type === "post" ? 310 : 155;
  const characterCount = Math.min(sampleText.length, maxNumberOfCharacters);

  return (
    <View
      style={[style.container, { marginLeft: type === "reply" ? "5%" : 0 }]}
    >
      <View
        style={[
          style.headerContainer,
          { marginLeft: type === "reply" ? 0 : "7%" },
        ]}
      >
        <TouchableOpacity
          style={style.userContainer}
          onPress={() => navigation.navigate("profile" as never)}
        >
          <ProfileImage size={type === "reply" ? 25 : undefined} />
          <Text
            style={[style.userName, { fontSize: type === "reply" ? 18 : 20 }]}
          >
            Welshy
          </Text>
        </TouchableOpacity>
        <Text style={style.date}>Today at 9:00 PM</Text>
      </View>

      <View
        style={{
          alignSelf: type === "reply" ? "flex-start" : "center",
          width: type === "reply" ? "100%" : "60%",
        }}
      >
        <Text style={style.postContent}>
          {!showMore ? sampleText.substring(0, characterCount) : sampleText}
        </Text>
        {sampleText.length > maxNumberOfCharacters ? (
          <TouchableOpacity>
            <Text
              style={style.showMore}
              onPress={() => setShowMore((prev) => !prev)}
            >
              Show {showMore ? "Less" : "more"}
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {children}
      </View>
      <View style={style.line} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  userName: {
    color: "white",
    marginLeft: 20,
    fontWeight: "bold",
  },

  line: {
    width: "100%",
    height: 1,
    marginTop: 15,
    backgroundColor: "white",
  },

  showMore: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  postContent: { color: "white" },
  date: { color: "white", marginLeft: 30 },
});

export default Content;
