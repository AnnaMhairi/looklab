import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Platform, StyleSheet } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import LookDetailScreen from "./screens/LookDetailScreen";
import CartScreen from "./screens/CartScreen";
import AuthScreen from "./screens/AuthScreen";
import CartIcon from "./components/CartIcon";
import { AuthContext } from "./context/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem("@cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      await AsyncStorage.setItem("@cart", JSON.stringify(cart));
    };
    saveCart();
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updatedCart;
  
      if (existing) {
        // Pull from the incoming item to make sure price and other fields are retained
        updatedCart = prev.map((i) =>
          i.id === item.id
            ? { ...item, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Add new item with quantity
        updatedCart = [...prev, { ...item, quantity: 1 }];
      }
  
      return updatedCart;
    });
  };
  

  const updateCartItem = (itemId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerRight: () => (
                <CartIcon totalItems={cart.reduce((sum, i) => sum + i.quantity, 0)} />
              ),
              headerTitleAlign: "center",
            }}
          >
            {!user ? (
              <Stack.Screen name="Login" component={AuthScreen} />
            ) : (
              <>
                <Stack.Screen name="LookLab" component={HomeScreen} />
                <Stack.Screen name="LookDetail">
                  {(props) => (
                    <LookDetailScreen {...props} addToCart={addToCart} cart={cart} />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Cart">
                  {(props) => (
                    <CartScreen {...props} cart={cart} updateCartItem={updateCartItem} />
                  )}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === "web" ? 24 : 0,
    paddingHorizontal: Platform.OS === "web" ? 16 : 0,
    maxWidth: 900,
    alignSelf: "center",
    width: "100%",
  },
});
