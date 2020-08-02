import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import onLoginPress, { onCreateAccountPress, onLogoutPress } from "../auth";

export default function LoginScreen(props) {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sing-ly</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email. . ."
            placeholderTextColor="#003f5c"
            value={emailField}
            onChangeText={(text) => setEmailField(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password. . ."
            placeholderTextColor="#003f5c"
            value={passwordField}
            onChangeText={(text) => setPasswordField(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            onLoginPress(emailField, passwordField);
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onCreateAccountPress(emailField, passwordField)}
        >
          <Text style={styles.loginText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
