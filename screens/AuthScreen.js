// screens/AuthScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export default function AuthScreen() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const userObj = { username };
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userObj));
      setUser(userObj);
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LookLab 👋</Text>
      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} disabled={!username} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: Platform.OS === "web" ? 12 : 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
