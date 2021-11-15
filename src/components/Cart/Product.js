import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Image, TouchableWithoutFeedback, TextInput} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import { delete_product_shopping_cart, decreaseProductCartApi, increaseProductCartApi, read_product_shopping_cart } from '../../api/cart';
import colors from "../../styles/colors";
import useAuth from '../../hooks/useAuth';

export default function Product(props) {

  const { product, setReloadCart } = props;
  
  const [cartProduct, setcartProduct] = useState([]);

  const navigation = useNavigation();

  const { auth } = useAuth();

  useEffect(() => {
      (async () => {
          // const response = await read_product_shopping_cart(auth, product.product_id);
          // console.log(response.quantity);
      })();
  }, []);

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const deleteProductCart = async () => {
    const response = await delete_product_shopping_cart(auth, product.product_id);
    console.log(response);
    if (response) setReloadCart(true);
  }

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product.product_id);
    if (response) setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product.product_id);
    if (response) setReloadCart(true);
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToProduct(product.product_id)}>
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
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {product.product_name}
            </Text>
            <View style={styles.prices}>
              <Text style={styles.currentPrice}>
                $MXN {product.product_price}
              </Text>
            </View>
          </View>
          <View style={styles.btnsContainer}>
            <View style={styles.selectQuantity}>
              <IconButton
                icon="minus"
                color="black"
                size={16}
                style={styles.btnQuantity}
                onPress={decreaseProductCart}
              />
              {/* <TextInput style={styles.inputQuantity} value={cartProduct.quantity.toString()} /> */}
              <IconButton
                icon="plus"
                color="black"
                size={16}
                style={styles.btnQuantity}
                onPress={increaseProductCart}
              />
            </View>
            <Button color={colors.fontBlack} mode="contained" onPress={deleteProductCart}>
              Eliminar
            </Button>
          </View>
          <Button style={styles.btn} color={colors.primary} onPress={() => goToProduct(product.product_id)}>
            Ver producto
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.bgGray,
  },
  containerImage: {
    width: "35%",
    height: 155,
    backgroundColor: colors.bgGray,
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "65%",
    borderRadius: 5
  },
  name: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  currentPrice: {
    fontSize: 16,
  },
  oldPrice: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.fontPrice,
    textDecorationLine: "line-through",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%"
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center"
  },
  btnQuantity: {
    //backgroundColor: colors.bgwhite,
    borderRadius: 5,
    margin: 0,
    borderWidth: 0.5,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: "center",
  }
});
