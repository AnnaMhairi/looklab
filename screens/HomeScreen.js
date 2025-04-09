import React from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import LookbookCard from "../components/LookbookCard";

const lookbooks = [
  {
    id: "1",
    title: "Cozy Neutrals",
    image: "https://images.unsplash.com/photo-1602810310045-0c2a4b87a144?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        id: "a",
        name: "Beige Knit Sweater",
        image: "https://images.unsplash.com/photo-1602810310045-0c2a4b87a144?auto=format&fit=crop&w=400&q=80",
        price: "$59",
      },
      {
        id: "b",
        name: "Cream Joggers",
        image: "https://images.unsplash.com/photo-1618354691212-d472f4e5538e?auto=format&fit=crop&w=400&q=80",
        price: "$48",
      },
    ],
  },
  {
    id: "2",
    title: "Date Night Glam",
    image: "https://images.unsplash.com/photo-1612423284934-94f3eb6e1f6d?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        id: "c",
        name: "Red Satin Dress",
        image: "https://images.unsplash.com/photo-1603201667140-b9c3a3adbb4b?auto=format&fit=crop&w=400&q=80",
        price: "$89",
      },
      {
        id: "d",
        name: "Gold Heels",
        image: "https://images.unsplash.com/photo-1600195077073-3be9c1916f4a?auto=format&fit=crop&w=400&q=80",
        price: "$75",
      },
    ],
  },
  {
    id: "3",
    title: "Streetwear Edge",
    image: "https://images.unsplash.com/photo-1603252109303-2751441d9c95?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        id: "e",
        name: "Oversized Hoodie",
        image: "https://images.unsplash.com/photo-1585386959984-a4155223f9e4?auto=format&fit=crop&w=400&q=80",
        price: "$65",
      },
      {
        id: "f",
        name: "Chunky Sneakers",
        image: "https://images.unsplash.com/photo-1583422409516-296e8b2e2b65?auto=format&fit=crop&w=400&q=80",
        price: "$120",
      },
    ],
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Go to Cart" onPress={() => navigation.navigate("Cart")} />
      <FlatList
        data={lookbooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LookbookCard
            look={item}
            onPress={() => navigation.navigate("LookDetail", { look: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
});
