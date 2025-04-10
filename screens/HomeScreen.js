import React from "react";
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const looks = [
  {
    id: "1",
    title: "Cozy Chic",
    image: require("../assets/look1.jpg"),
    description: "A comfy knit set perfect for chilly days.",
    price: 89.99,
  },
  {
    id: "2",
    title: "Urban Edge",
    image: require("../assets/look2.jpg"),
    description: "Layered neutrals with bold accessories.",
    price: 102.99,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("LookDetail", { look: item })}
      >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  )};

  return (
    <View style={styles.container}>
      <FlatList
        data={looks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 900,
    alignSelf: "center",
  },
  listContent: {
    gap: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // or any visible color
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});
