import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import firebase from "./ApiKeys";
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import RecordScreen from "./screens/RecordScreen";
import MachineLearningScreen from "./screens/MachineLearningScreen";

const Stack = createStackNavigator();
const TabNav = createBottomTabNavigator();

console.disableYellowBox = true;

export default function App() {
  const [auth, setAuth] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    setAuth(user == null ? false : true);
    setAuthReady(true);
  });

  // Check if auth state has been updated for the first time to
  // decide whether to display the login page or home page
  if (!authReady) {
    return null;
  } else if (!auth) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <TabNav.Navigator initialRouteName="Sing">
          <TabNav.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-contact" size={size} color={color} />
              ),
            }}
          />
          
          <TabNav.Screen
            name="Sing"
            component={RecordScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-microphone" size={size} color={color} />
              ),
            }}
          />
          <TabNav.Screen
            name="Phonation ML"
            component={MachineLearningScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-stats" size={size} color={color} />
              ),
            }}
          />
          <TabNav.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="md-trophy" size={size} color={color} />
              ),
            }}
          />
        </TabNav.Navigator>
      </NavigationContainer>
    );
  }
}
