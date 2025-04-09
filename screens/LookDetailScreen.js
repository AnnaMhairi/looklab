import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";

export default function LookDetailScreen({ route, addToCart }) {
  const { look } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: look.image }} style={styles.image} />
      <Text style={styles.title}>{look.title}</Text>
      <Text style={styles.subtitle}>Shop the Look</Text>
      <FlatList
        data={look.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Pressable
                style={styles.button}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});