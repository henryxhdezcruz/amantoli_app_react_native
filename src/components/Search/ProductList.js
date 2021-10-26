import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";

export default function ProductList(props) {

  const { products } = props;

  const navigation = useNavigation();

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
    //console.log("Cargar produco >");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>RESULTADOS</Text>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product.product_id}
          onPress={() => goToProduct(product.product_id)}
        >
          <View style={styles.product}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: `http://amantoli.com.mx/storage/${product.product_image}`,
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {product.product_name}
              </Text>
              <View style={styles.prices}>
                <Text style={styles.currentPrice}>
                  $MXN {calcPrice(product.product_price, product.discount)}
                </Text>
                {product.discount && (
                  <Text style={styles.oldPrice}>$ {product.price}</Text>
                )}
              </View>
              <Button style={styles.btn} color={colors.primary}>
                Ver producto
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
  },
  containerImage: {
    width: "40%",
    height: 140,
    backgroundColor: "#ebebeb",
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
  },
  name: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 22,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
