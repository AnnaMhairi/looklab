import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

export default function CartScreen({ cart, updateCartItem }) {
  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.quantity * (item.price ?? 0), 0).toFixed(2);  

  const renderItem = ({ item }) => {
    return(
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${(item.price ?? 0).toFixed(2)}</Text>
        </View>
      <View style={styles.controls}>
        <Text>Qty:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={item.quantity.toString()}
          onChangeText={(text) => {
            const quantity = parseInt(text) || 1;
            updateCartItem(item.id, quantity);
          }}
        />
        <Text style={styles.subtotal}>
          Subtotal: ${(item.quantity * (item.price ?? 0)).toFixed(2)}
        </Text>
      </View>
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 16 }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${getTotal()}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 900,
    alignSelf: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  info: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    color: "#666",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    width: 50,
    textAlign: "center",
  },
  subtotal: {
    marginLeft: "auto",
    fontWeight: "500",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "600",
  },
  checkoutButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
