import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import COLORS from "./styles/colors";
import DismissableKeyboardView from "./components/DismissableKeyboardView";
import Button from "./components/Button";
import { Link } from "@react-navigation/native";
import { useToast } from "./context/toast/ToastContext";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { onLogin } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({
    username: false,
    password: false,
  });

  const handleFormChange = (name: keyof LoginForm, text: string) => {
    setForm((prev) => ({ ...prev, [name]: text }));
  };

  const handleLogin = () => {
    let isFormError = false;

    if (form.username.length === 0) {
      setFormErrors((prev) => ({ ...prev, username: true }));
      toast.error("Username Field Empty");
      isFormError = true;
    }
    if (form.password.length === 0) {
      setFormErrors((prev) => ({ ...prev, password: true }));
      toast.error("Password Field Empty");
      isFormError = true;
    }

    if (isFormError) return;

    onLogin(form);
  };

  return (
    <DismissableKeyboardView style={styles.container}>
      <View>
        <TextInput
          style={[
            styles.input,
            { borderColor: formErrors.username ? "red" : "grey" },
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          textContentType="username"
          placeholder="Username"
          placeholderTextColor="grey"
          value={form.username}
          onChangeText={(txt) => handleFormChange("username", txt)}
        />
        <TextInput
          style={[
            styles.input,
            { borderColor: formErrors.password ? "red" : "grey" },
          ]}
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          autoComplete="password"
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(txt) => handleFormChange("password", txt)}
        />

        <Button
          text="Login"
          textStyle={styles.buttonText}
          onPress={handleLogin}
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
