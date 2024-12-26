import { Link, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { defaultPizzaImage } from "@/components/ProductListItem";
import products from "@/assets/data/products";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/provider/CartProvider";
import { PizzaSize } from "@/type";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const product = products.find((product) => product.id === id);
  const sizes:PizzaSize[] = ["S", "M", "L", "XL"];
  const {addItem} = useCart()

  const addToCart = () => {
    if (product) {
addItem(product, selectedSize)
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: size === selectedSize ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: "50%",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;
