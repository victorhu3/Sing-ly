import React, { useState } from "react";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import audioPlayback, {
  recordAudio,
  stopRecordingAudio,
  pushToFirebase,
  pullFromFirebase,
  readFirebaseDatabase,
  pushToML,
  getML,
} from "../audioPlayback";

let recorder = null;

export default function MachineLearningScreen() {
  const [recording, setRecording] = useState(false);
  const [fileName, setFileName] = useState(null);

  return (
    <LinearGradient
    //   colors={["purple", "rgb(153, 227, 255)"]}
    colors={["rgb(135, 87, 247)", "rgb(153, 227, 255)"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.container}>
      <Text style={styles.heading}>Phonation Mode Detection</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Press the record button and record a short snippet of yourself singing
          a note. Then press the "Get Results" button to find your Phonation
          Mode.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.circleMic}
        onPress={() => {
          if (!recording) {
            recorder = new Audio.Recording();
            recordAudio(recorder);
          } else {
            stopRecordingAudio(recorder).then(() => {
              setFileName(pushToML(recorder.getURI()));
            });
          }
          setRecording(!recording);
        }}
      >
        {recording ? (
          <Ionicons
            style={styles.icon}
            name="md-reorder"
            size={50}
            color="black"
          />
        ) : (
          <Ionicons
            style={styles.icon}
            name="ios-mic"
            size={50}
            color="black"
          />
        )}
      </TouchableOpacity>
      <View style={styles.buttonBar}>
        <View style={styles.buttons}>
          <Button
            title="Play it back"
            onPress={() => {
              audioPlayback(recorder);
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title="Get Results"
            onPress={() => {
              getML(fileName);
            }}
          />
        </View>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#003f5c",
    alignItems: "center",
    height: "100%",
  },
  buttonBar: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttons: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  icon: {
    textAlign: "center",
  },
  circleMic: {
    marginTop: 110,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fb5b5a",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    margin: 25,
    fontWeight: "bold",
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
  description: {
    color: "black",
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  descriptionBox: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    backgroundColor: "#dbdbdb",
  },
});
