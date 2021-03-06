import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { map } from "lodash";
import Product from "./Product";

export default function FavoriteList(props) {

  const { products, setReloadFavorite, auth } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LISTA DE FAVORITOS</Text>
      {map(products, (item) => (
        <Product
          key={item.product_id}
          item={item}
          auth={auth}
          setReloadFavorite={setReloadFavorite}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
});
