import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Picker,
} from "react-native";
import { getLeaderboard } from "../audioPlayback.js";
import { setIsEnabledAsync } from "expo-av/build/Audio";
import RNPickerSelect from "react-native-picker-select";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";

import Session from "../components/Session";

//Placeholder item
var place = { label: "Select a song!", value: "" };

export default function LeaderboardScreen({ navigation }) {
  const [selectedSong, setSong] = useState("");
  const [board, setBoard] = useState(null);

  const songInputHandler = (song) => {
    if (song != "") {
      setSong(song);
      getLeaderboard(song).then((b) => {
        setBoard(b);
        console.log(board);
      });
    }
    //  parseLeaderboard();
  };

  //const parseLeaderboard = () => {
  // var leaderboard = returnLeaderboard();
  //var leaderboard = [
  //   [72, "victorhu@gmail.com", "8-6-2020", "14:30"],
  //   [18, "wadhwaaman1013@gmail.com", "8-1-2020", "4:59"],
  //  ];
  //   console.log(leaderboard);
  //   setBoard(leaderboard);
  // };

  return (
    <LinearGradient
    //   colors={["purple", "rgb(153, 227, 255)"]}
    // colors={["rgb(11, 20, 191)", "rgb(153, 227, 255)"]}
    colors={["rgb(111, 196, 191)", "#e1eec3"]}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.container}>
      <View style={styles.leaderboardStyle}>
        <Text style={styles.logo}>Leaderboard</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              console.log(value);
              songInputHandler(value);
            }}
            items={[
              { label: "Happy Birthday", value: "Happy Birthday" },
              { label: "If I Die Young", value: "If I Die Young" },
              { label: "Blank Space", value: "Blank Space" },
            ]}
            placeholder={place}
          />
        <Text style={styles.text}>"{selectedSong}" highest scores!</Text>
      </View>
      <View>
      <ScrollView style={styles.session}>
        {board != null
          ? board.map((session, index) => (
              // <View style={styles.listItem} key={session}>
              //   <Text>{session[0]}</Text>
              // </View>
              <View>
                <Text style={styles.place}>{index + 1}</Text>
                <Session
                  score={session[0]}
                  email={session[1]}
                  date={session[2]}
                  time={session[3]}
                />
              </View>
            ))
          : null}
      </ScrollView>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // backgroundColor: "#003f5c",
    flexDirection: "column",
  },
  picker: {
    backgroundColor: "red",
  },
  text: {
    marginTop: 10,
    color: "white",
    fontSize: 20,
  },
  grad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 20,
  },
  leaderboardStyle: {
    flex: 1,
    // justifyContent: "center",
    flexDirection: "column",
    marginTop: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  place: {
    fontWeight: "bold",
    textAlign: "center",
    // color: "white",
    color: "#f05053",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 2,
    fontSize: 25,
  },
  session: {},
});
