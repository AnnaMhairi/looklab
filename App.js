import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LookDetailScreen from "./screens/LookDetailScreen";
import CartScreen from "./screens/CartScreen";

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LookLab">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LookDetail">
          {(props) => <LookDetailScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cart={cart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}