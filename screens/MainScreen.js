import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Audio } from "expo-av";

import { onLogoutPress } from "../auth";

import audioPlayback, {
  recordAudio,
  stopRecordingAudio,
  pushToFirebase,
  pullFromFirebase,
  readFirebaseDatabase,
  testing,
  test,
} from "../audioPlayback";

let recorder = new Audio.Recording();

export default function MainScreen({ navigation }) {
  const [isRecording, setRecording] = useState(false);

  return (
    <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Upload"
        onPress={() => pushToFirebase(recorder.getURI())}
      />
      <Button title="Playback" onPress={() => audioPlayback(recorder)} />
      <Button
        title="Download"
        onPress={() => pullFromFirebase("UserName/testDownload1.m4a")}
      />
      <Button
        title="Record"
        onPress={() => {
          if (!isRecording) {
            recordAudio(recorder);
          } else {
            stopRecordingAudio(recorder);
          }
          setRecording(!isRecording);
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          onLogoutPress();
        }}
      />
      <Button
        title="get score"
        onPress={() => {
          test();
        }}
      />
      <Button title="Switch" onPress={() => navigation.navigate("Login")} />
      <Button title="read" onPress={readFirebaseDatabase} />
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
});
