import React, { useLayoutEffect } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import CartIcon from "../components/CartIcon";

export default function LookDetailScreen({ navigation, route, cart, addToCart }) {
  const { look } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CartIcon totalItems={cart?.reduce((sum, i) => sum + i.quantity, 0)} />
      ),
    });
  }, [navigation, cart]);

  return (
    <View style={styles.container}>
      <Image source={look.image} style={styles.image} />
      <Text style={styles.title}>{look.title}</Text>
      <Text style={styles.price}>${look.price?.toFixed?.(2) || "0.00"}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(look)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    marginVertical: 10,
  },
});