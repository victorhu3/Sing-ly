import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../ApiKeys";
import Recording from "../components/Recording";
import { onLogoutPress } from "../auth";
import { returnPreviousSessions, getPreviousInfo } from "../audioPlayback";


export default function ProfileScreen({ navigation }) {
  const [sessionsUpdated, setSessionsUpdated] = useState(null);

  if (!sessionsUpdated) {
    getPreviousInfo().then((prev) => {
      setSessionsUpdated(prev);
    });
  }

  return (
    <LinearGradient
    //   colors={["purple", "rgb(153, 227, 255)"]}
    colors={["#000428", "#004e92"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.username}>{firebase.auth().currentUser.email}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress= {() => setSessionsUpdated(null)} >
          <Ionicons name="ios-refresh" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {sessionsUpdated != null
          ? sessionsUpdated.map((recording) => {
              return (
                <Recording
                  key={recording[1] + recording[2]}
                  songName={recording[0]}
                  date={recording[1]}
                  time={recording[2]}
                  score={recording[3]}
                />
              );
            })
          : null}
      </ScrollView>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#003f5c",
    height: "100%",
  },
  heading: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  refreshButton: {
    flex: .3,
    padding: 10,
    alignItems:"center",
    backgroundColor: "black",
  },
  username: {
    flex: 2,
    color: "white",
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: "black",
    flex: 1,
    margin: 10,
  },
  logoutText: {
    padding: 7,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
