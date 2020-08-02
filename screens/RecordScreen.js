import React, { useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Picker,
} from "react-native";
import audioPlayback, {
  getLeaderboard,
  recordAudio,
  stopRecordingAudio,
  savedAudio,
  pullFromFirebase,
} from "../audioPlayback.js";
import { setIsEnabledAsync } from "expo-av/build/Audio";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";

var place = { label: "Please select a song to sing!", value: "" };
var directions =
  "Directions: When you press the start button, the actual song will play in the background as you sing. After you are finished, you will be able to playback your latest recording. If you are satisfied with it, then you can upload it to the server for grading. Otherwise, you can re-record.";
var directions2 = "NOTE: Headphones/Earbuds are necessary!";
// Start button -
// Stop button -

import Lyrics from "../components/Lyrics";

var recorder = null;

export default function RecordScreen({ navigation }) {
  const [selectedSong, setSelectedSong] = useState("");
  const [ready, setReady] = useState(false); // Ready to Record Boolean
  const [isRecording, setIsRecording] = useState(false); // If the user is currently recording Boolean
  const [recordingFileGenerated, setRecordingFileGenerated] = useState(false); // If recording file is generated Boolean

  const selectSongHandler = (song) => {
    if (song != "") {
      setSelectedSong(song);
    } else {
      setReady(false);
    }
  };

  const updateReady = (state) => {
    setReady(state);
  };

  const updateIsRecording = (state) => {
    setIsRecording(state);
    if (state) {
      console.log("Start Button was Pressed!");
      recorder = new Audio.Recording();
      recordAudio(recorder);
      setRecordingFileGenerated(false);
      let songName = selectedSong.replace(/ /g, "");
      pullFromFirebase("Songs/" + songName + ".m4a");
    } else {
      console.log("Stop Button was Pressed!");
      stopRecordingAudio(recorder);
      setRecordingFileGenerated(true);
    }
  };

  const playbackRecording = () => {
    audioPlayback(recorder);
  };

  const uploadRecording = () => {
    savedAudio(selectedSong, recorder.getURI());
    setRecordingFileGenerated(false); //Reset session so can record another song
  };

  return (
    <LinearGradient
      //   colors={["purple", "rgb(153, 227, 255)"]}
      colors={["purple", "rgb(255, 183, 0)"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Sing!</Text>
      <RNPickerSelect
        style={picker}
        onValueChange={(value) => {
          console.log(value);
          selectSongHandler(value);
          updateReady(true);
        }}
        items={[
          { label: "Happy Birthday", value: "Happy Birthday" },
          { label: "If I Die Young", value: "If I Die Young" },
          { label: "Blank Space", value: "Blank Space" },
        ]}
        placeholder={place}
      />
      {ready ? <Text style={styles.display}>{directions}</Text> : null}
      {ready ? (
        <View style={styles.display2container}>
          <Text style={styles.display2}>{directions2}</Text>
        </View>
      ) : null}
      {ready ? <Lyrics style={styles.lyrics} song={selectedSong} /> : null}
      {ready ? (
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="START"
              disabled={isRecording}
              onPress={updateIsRecording.bind(this, true)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="END"
              color="red"
              disabled={!isRecording}
              onPress={updateIsRecording.bind(this, false)}
            />
          </View>
        </View>
      ) : null}
      {ready ? (
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Playback"
              color="green"
              disabled={!recordingFileGenerated}
              onPress={playbackRecording}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Upload"
              color="orange"
              disabled={!recordingFileGenerated}
              onPress={uploadRecording}
            />
          </View>
        </View>
      ) : null}
    </LinearGradient>
  );
}

const picker = {

  inputAndroid: {
    color: "white",
    justifyContent: "center",
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     // backgroundColor: "#003f5c",
  //     backgroundColor: "rgb(201, 240, 255)",
  //     textAlign: "center",
  //     flexDirection: "column",
  //     alignContent: "center",
  //     marginTop: 50,
  //   },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 70,
    marginTop: 50,
    marginBottom: 35,
  },
  display: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    lineHeight: 15,
    color: "#fff",
    fontSize: 12,
  },
  display2: {
    margin: 15,
    lineHeight: 20,
    fontWeight: "bold",
    color: "white",
    // color: "rgb(0, 136, 255)",
  },
  display2container: {
    // backgroundColor: "white",
  },
  lyrics: {
    marginBottom: -50,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  button: {
    width: "40%",
  },
});
