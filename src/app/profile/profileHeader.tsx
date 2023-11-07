import { useAuth } from "../../context/AuthContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "../../components/Modal";
import ProfileImage from "../../components/ProfileImage";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileHeader = () => {
  const { authState, onLogout } = useAuth();
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.SurfaceDark }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ProfileImage size={60} />
          <TouchableOpacity
            style={styles.userNameButton}
            onPress={() => setLogOutModalVisible((prev) => !prev)}
          >
            <Text style={styles.userName}>{authState.user?.username}</Text>
            <AntDesign name="caretdown" size={10} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statContent}>
            <Text style={styles.statHeader}>Posts</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statHeader}>Followers</Text>
            <Text style={styles.statValue}>321</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statHeader}>Likes</Text>
            <Text style={styles.statValue}>120</Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />

      <Modal
        visible={logOutModalVisible}
        setVisible={setLogOutModalVisible}
        style={styles.logoutModalContainer}
        blur={false}
      >
        <Button
          text="Log Out"
          textStyle={styles.logOutText}
          style={styles.logOutButton}
          onPress={() => onLogout()}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  userNameButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    color: "white",
    fontSize: 25,
    marginRight: 5,
    marginLeft: 10,
  },

  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statContent: {
    alignItems: "center",
  },
  statHeader: { color: "white", fontWeight: "bold", fontSize: 16 },
  statValue: { color: "white", fontSize: 16 },
  logoutModalContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: COLORS.Secondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  logOutButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: 70,
    width: 260,
    backgroundColor: COLORS.ErrorContainer,
  },
  logOutText: { color: COLORS.Error, fontSize: 20 },
  line: {
    backgroundColor: "white",
    width: "100%",
    paddingTop: 1,
  },
});
export default ProfileHeader;
