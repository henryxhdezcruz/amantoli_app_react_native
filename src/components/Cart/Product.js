import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import {
  deleteProductCartApi,
  decreaseProductCartApi,
  increaseProductCartApi,
} from '../../api/cart';
import colors from "../../styles/colors";

export default function Product(props) {
  const { product, setReloadCart } = props;

  const navigation = useNavigation();

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  }

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToProduct(product._id)}>
      <View style={styles.product}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            source={{
              uri: `${API_URL}${product.main_image.url}`,
            }}
          />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {product.title}
            </Text>
            <View style={styles.prices}>
              <Text style={styles.currentPrice}>
                $MXN {calcPrice(product.price, product.discount)}
              </Text>
              {product.discount && (
                <Text style={styles.oldPrice}>$MXN {product.price}</Text>
              )}
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
              <TextInput style={styles.inputQuantity} value={product.quantity.toString()} />
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
          <Button style={styles.btn} color={colors.primary} onPress={() => goToProduct(product._id)}>
            Ver producto
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
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
    borderWidth: 1,
    borderColor: colors.bgGray,
  },
  containerImage: {
    width: "40%",
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
    width: "60%",
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
    fontSize: 18,
  },
  oldPrice: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.fontPrice,
    textDecorationLine: "line-through",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
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
