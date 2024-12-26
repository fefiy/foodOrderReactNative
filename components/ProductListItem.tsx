import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Link, useSegments } from "expo-router";
import { Image } from 'react-native';
interface ProductListItemProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}
export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments()
   const productRoute = `/${segments[0]}/menu/${product.id}` as `${string}:${string}`
  return (
    <Link href={productRoute} asChild>
      <Pressable style={styles.container}>
      <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image}
          resizeMode="contain"/>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
  },
});
export default ProductListItem;
