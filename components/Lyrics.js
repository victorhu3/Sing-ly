import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const Lyrics = (props) => {
  return (
    <View style = {styles.scroll}>
    <ScrollView >
      <Text style = {styles.lyric}>Lyrics:</Text>
      <View>
        <Text style = {styles.lyric}>If I die young bury me in satin</Text>
        <Text style = {styles.lyric}>Lay me down on a bed of roses</Text>
        <Text style = {styles.lyric}>Sink me in the river at dawn</Text>
        <Text style = {styles.lyric}>Send me away with the words of a love song</Text>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
  lyric: {
    fontWeight: "bold",
  },
  scroll: {
    height:120,
  }
});

export default Lyrics;
