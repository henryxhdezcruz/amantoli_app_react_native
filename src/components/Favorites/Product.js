import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import { deleteFavoriteApi } from "../../api/favorite";
import { useToast } from 'react-native-fast-toast';
import Buy from "../Product/Buy";
import { formStyle } from '../../styles'
import colors from "../../styles/colors";

export default function Product(props) {

  const { item, auth, setReloadFavorite } = props;

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const toast = useToast();

  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  const deleteFavorite = async (id) => {
    setLoading(true);
    await deleteFavoriteApi(auth, id);
    setReloadFavorite(true);
    setLoading(false);
    toast.show("Producto eliminado de favoritos", {
      duration: 4000,
      offset: 40,
      animationType: 'zoom-in',
    });
  };


  return (
    <TouchableWithoutFeedback onPress={() => goToProduct(item.product_id)}>
      <View style={styles.product}>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
          source={{
            uri: `http://amantoli.com.mx/storage/${item.product_image}`,
          }}
          />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {item.product_name}
            </Text>
            <View style={styles.prices}>
              <Text style={styles.currentPrice}>
                $MXN {calcPrice(item.product_price, item.discount)}
              </Text>
              {item.discount && (
                <Text style={styles.oldPrice}>$MXN {item.product_name}</Text>
              )}
            </View>
          </View>
          <View style={styles.btnsContainer}>
            <Button
              //style={formStyle.btnProduct}
              //color={colors.dark}
              color={colors.bgDark}
              onPress={() => goToProduct(item.product_id)}
            >
              Ver producto
            </Button>
            {/* <Icon
              name="trash"
              type='font-awesome'
              color={colors.fontBlack}
              size={25}
              raised
              onPress={() => deleteFavorite(item.product._id)}
            /> */}
            <Button
              color={colors.fontBlack}
              mode="contained"
              onPress={() => deleteFavorite(item.product_id)}
            >
              Eliminar
            </Button>
          </View>
          <Buy product={item.product} quantity={1} />
        </View>

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    //elevation: 3,
    //padding: 10,
    borderWidth: 1,
    borderColor: colors.bgGray,
  },
  containerImage: {
    width: "35%",
    height: 170,
    backgroundColor: colors.bgGray,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "63%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    color: colors.fontPrice,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 18,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: colors.fontPrice,
    textDecorationLine: "line-through",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
    alignItems: "center",
    paddingRight: 10
  },
  loading: {
    backgroundColor: colors.primary,
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
});

