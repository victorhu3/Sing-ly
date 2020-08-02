import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { pullFromFirebase } from "../audioPlayback";
import firebase from "../ApiKeys"

function playSong(name, date, time) {

  name = name.replace(/ /g, "");

  time = time.replace(":", "");
  //if(time.length < 4) time = "0"+time;

  let fileName = name + "_" + date + "_" + time + ".m4a";
 
  var user = firebase.auth().currentUser;

  var email = "";
  if (user != null) {
    email = user.email;
  }
  fileName = email.substring(0, email.indexOf("@")) + "/" + fileName;
  console.log(fileName);

  pullFromFirebase(fileName);
}

export default function Recording(props) {
  const [playingBack, setPlayingBack] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.songName}>{props.songName}</Text>
        <Text style={styles.score}>Score: {props.score}%</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.date}>
          {props.date} {props.time}
        </Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if(!playingBack) playSong(props.songName, props.date, props.time);
            setPlayingBack(!playingBack);
          }}
        >
          {playingBack ? <Ionicons name="ios-pause" size={32} color="black" /> : <Ionicons name="ios-arrow-dropright" size={32} color="black" />}
          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    // backgroundColor: "#923600",
    backgroundColor: "#ff7d19",
    padding: 7,
  },
  info: {
    flexDirection: "row",
  },
  songName: {
    fontSize: 20,
    flex: 2,
  },
  score: {
    fontSize: 20,
    flex: 1,
  },
  date: {
    flex: 10,
    marginTop: 18,
  },
  playButton: {
    marginTop: 10,
    flex: 1,
  },
});
