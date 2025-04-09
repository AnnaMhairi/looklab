import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function LookbookCard({ look, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: look.image }} style={styles.image} />
      <Text style={styles.title}>{look.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
});
