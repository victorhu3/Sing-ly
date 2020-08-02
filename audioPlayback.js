import React from "react";
import { Text, Alert } from "react-native";
import { Audio } from "expo-av";

import firebase from "./ApiKeys";

var leaderboard = [];
var testGlob = "";

export async function stopRecordingAudio(recorder) {
  //STOP BUTTON
  console.log(await recorder.getStatusAsync());

  try {
    await recorder.stopAndUnloadAsync();
    console.log("Sucessfully stopped recording audio.");
  } catch {
    console.log("Could not stop recording audio.");
  }

  console.log(recorder.getURI());
}

export async function recordAudio(recorder) {
  // start button pressed
  Audio.requestPermissionsAsync();

  try {
    await recorder.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    await recorder.startAsync();
    console.log(await recorder.getStatusAsync());
  } catch (error) {
    console.log("Could not record audio.");
  }
}

export async function testing() {
  var linkHead = "https://sidsrivastava.pythonanywhere.com/";
  var fetchPath =
    linkHead +
    "?" +
    "song=" +
    "IfIDieYoung" +
    "&" +
    "name1=" +
    "IfIDieYoung_8-1-2020_1050" +
    "&" +
    "user=" +
    "victorhu3";
  let score = await fetch(fetchPath);
  let text = await score.text();
  console.log(text);
  alert(text);
}

export async function test() {
  var linkHead = "https://sidsrivastava.pythonanywhere.com/ml";

  var username = email.substring(0, email.indexOf("@"));
  var today = new Date();
  var fetchPath =
    linkHead + "?" + "user=" + "victorhu3" + "&" + "file=" + "Recording_7";
  let score = await fetch(fetchPath);
  let text = await score.text();
  console.log(text);
  alert(text);
}


export async function getML(file){
  var user = firebase.auth().currentUser;

  var email = "";
  if (user != null) {
    email = user.email;
  }
  var username = email.substring(0, email.indexOf("@"));
  var linkHead = "https://sidsrivastava.pythonanywhere.com/ml";
  var fetchPath = linkHead+"?"+"user="+username+"&"+"file="+file;
  console.log(fetchPath);
  let score = await fetch(fetchPath);
  let text = await score.text();
  console.log(text);
  Alert.alert("Phonation Mode", "Your phonation mode is classified as: " + text);
}

export default async function audioPlayback(recorder) {
  // playback the audio of file just recorded
  try {
    let sound = (await recorder.createNewLoadedSoundAsync()).sound;
    await sound.playAsync();
  } catch (error) {
    console.log("Could not play sound.");
  }
}

function uriToBlob(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };

    xhr.responseType = "blob";

    xhr.open("GET", uri, true);
    xhr.send(null);
  });
}

export function pushToFirebase(uri) {
  try {
    var storage = firebase.storage();
    var ref = storage.ref();
    ref = ref.child("username/downloads.m4a");
    uriToBlob(uri).then((blob) => ref.put(blob, { contentType: "audio/m4a" }));
  } catch (error) {
    console.log("couldnt use firebase");
  }
}

export function pushToML(uri) {
  try {
    var storage = firebase.storage();
    var ref = storage.ref();

    var user = firebase.auth().currentUser;
    var email = "";
    if (user != null) {
      email = user.email;
    }
    var username = email.substring(0, email.indexOf("@"));
    
    var today = new Date();
    var date = (today.getMonth() + 1) + "-" + today.getDay() + "-" + today.getFullYear();
    var storageTime = String(today.getHours()) + String(today.getMinutes());
    var filePath = date + "_" + storageTime;
    
    ref = ref.child(username+"/"+filePath+".m4a");
    uriToBlob(uri).then((blob) => ref.put(blob, { contentType: "audio/m4a" }));

    return filePath;
  } catch (error) {
    console.log("couldnt use firebase");
  }
}

export function pullFromFirebase(path) {
  var storage = firebase.storage();
  var ref = storage.ref();
  ref
    .child(path)
    .getDownloadURL()
    .then(async (url) => {
      let audio = (await Audio.Sound.createAsync({ uri: url })).sound;
      await audio.playAsync();
    });
}

export function readFirebaseDatabase() {
  console.log("running readFirebaseDatabase function");
  firebase
    .database()
    .ref("accounts/user/songName")
    .once("value")
    .then((dataSnapshot) => {
      //console.log(dataSnapshot.val());
      testGlob = dataSnapshot.val();
    });
  console.log(testGlob);
}

export function writeFirebaseDatabase() {
  var ref = firebase.database().ref("leaderboard/If I Die Young");
  var newUser = ref.push();
  newUser.set({
    "": [""],
  });
}
export async function savedAudio(song, uri) {
  // change uri to recorder and get URI
  // upload when user is satisfied
  var user = firebase.auth().currentUser;

  var email = "";
  if (user != null) {
    email = user.email;
    console.log(email);
  }
  var linkHead = "https://sidsrivastava.pythonanywhere.com/";
  var songHead = song.split(" ");
  songHead = songHead.join("");
  console.log(songHead);
  var username = email.substring(0, email.indexOf("@"));
  var today = new Date();
  var date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var storageTime = String(today.getHours()) + String(today.getMinutes());
  var filePath = songHead + "_" + date + "_" + storageTime;
  var fetchPath =
    linkHead +
    "?" +
    "song=" +
    songHead +
    "&" +
    "name1=" +
    filePath +
    "&" +
    "user=" +
    username;

  filePath = filePath + ".m4a";
  try {
    var storage = firebase.storage();
    var ref = storage.ref();
    ref = ref.child(username + "/" + filePath);
    uriToBlob(uri)
      .then((blob) =>
        ref
          .put(blob, { contentType: "audio/m4a" })
          .then(async function (snapshot) {
            console.log(fetchPath);
            let score = await fetch(fetchPath);
            let text = await score.text();
            console.log(text);
            alert(text);

            var ref = firebase
          .database()
          .ref("accounts/" + username)
          .push();
          ref.set({
          song_name: song,
          date: date,
          time: time,
          accuracy: text,
        });

        var refSong = firebase.database().ref("leaderboard/" + song);
        var newUser = refSong.push();
        newUser.set({
          username: username,
          score: text,
          date: date,
          time: time,
        });
          })
      )
  } catch (error) {
    console.log("couldnt use firebase");
  }
  
}

export async function getPreviousInfo() {
  var user = firebase.auth().currentUser;

  var email = "";
  if (user != null) {
    email = user.email;
  }
  var username = email.substring(0, email.indexOf("@"));

  let previousSessions = [];

  var ref = firebase.database().ref("accounts/" + username);

  let snapshot = await ref.once("value");

  await snapshot.forEach(function (childSnapshot) {
    var x = [];
    x.push(childSnapshot.child("song_name").val());
    x.push(childSnapshot.child("date").val());
    x.push(childSnapshot.child("time").val());
    x.push(parseFloat(childSnapshot.child("accuracy").val()).toFixed(1));
    previousSessions.push(x);
  });

  return previousSessions;
}

//Sort function used to sort leaderboard
function sortFunction(a, b) {
  var sortBy = 0; //Index to sort by
  if (a[sortBy] === b[sortBy]) {
    return 0;
  } else {
    return a[sortBy] > b[sortBy] ? -1 : 1;
  }
}

export async function getLeaderboard(song) {
  leaderboard = [];
  var ref = firebase.database().ref("leaderboard/" + song);
  let snapshot = await ref.once("value");
  await snapshot.forEach(function (childSnapshot) {
    var x = [];
    x.push((parseFloat(childSnapshot.child("score").val())).toFixed(1));
    //console.log(childSnapshot.child('score').val());
    x.push(childSnapshot.child("username").val());
    //console.log(childSnapshot.child('username').val());
    x.push(childSnapshot.child("date").val());
    //console.log(childSnapshot.child('date').val());
    x.push(childSnapshot.child("time").val());
    //console.log(childSnapshot.child('time').val());
    //console.log(x);
    leaderboard.push(x);
  });
  leaderboard.sort(sortFunction);
  console.log(leaderboard);
  return leaderboard;
  // console.log(leaderboard);
}
