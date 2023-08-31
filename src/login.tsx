import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthContext";
import React, { useState } from "react";
import COLORS from "./styles/colors";
import DismissableKeyboardView from "./components/DismissableKeyboardView";
import Button from "./components/Button";
import { Link } from "@react-navigation/native";

const Login = () => {
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <DismissableKeyboardView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          textContentType="username"
          placeholder="Username"
          placeholderTextColor="grey"
          value={username}
          onChangeText={(txt) => setUsername(txt)}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          autoComplete="password"
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={(txt) => setPassword(txt)}
        />

        <Button
          text="Login"
          textStyle={styles.buttonText}
          onPress={() => onLogin({ username: username, password })}
          style={styles.button}
        />
        <Link to="/register" style={styles.registerText}>
          <Text>Register</Text>
        </Link>
      </View>
    </DismissableKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SurfaceDark,
  },
  input: {
    color: "white",
    minWidth: "65%",
    maxWidth: "65%",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "grey",
    paddingLeft: 5,
  },
  button: {
    backgroundColor: COLORS.Secondary,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.Primary,
  },
  registerText: {
    color: "white",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Login;
