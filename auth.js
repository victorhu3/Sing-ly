import firebase from "./ApiKeys";
import { View, StyleSheet, Button, Alert } from "react-native";

export default function onLoginPress(email, psswd) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, psswd)
    .then(
      () => {
        console.log("Login successful");
      },
      () =>
        Alert.alert(
          "Login Failure",
          "Please check your credentials again or make sure you have already created an account with that email.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        )
    );
}

export function onCreateAccountPress(email, psswd) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, psswd)
    .then(
      () => {
        Alert.alert(
          "Account Creation Successful",
          "You have successfully created an account!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        var username = email.substring(0, email.indexOf("@"));
        console.log(username);
        var ref = firebase.database().ref("accounts").child(username);
        ref.set({
          '0': [""],
        });
      },
      () =>
        Alert.alert(
          "Account Creation Failure",
          "Sorry! Please check your if you haven't registered this email yet or if your email is valid.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        )
    );
}

export function onLogoutPress() {
  firebase.auth().signOut();
}
