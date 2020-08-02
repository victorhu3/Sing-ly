import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Session(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.email}>{props.email}</Text>
          <Text style={styles.score}>Score: {props.score}%</Text>
        </View>
        <Text style={styles.date}>
          {props.date} {props.time}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: "#ff99c4",
    padding: 7,
  },
  info: {
    flexDirection: "row",
  },
  email: {
    fontSize: 15,
    flex: 2,
  },
  score: {
    fontSize: 20,
    flex: 1,
  },
  date: {
    marginTop: 18,
  },
});
