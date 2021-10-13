import React, { useState, useEffect } from 'react'
import { Image, View, Text, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native'
import { Button } from "react-native-paper"
import { map } from "lodash"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import colors from "../../styles/colors"
import { API_URL } from "../../utils/constants"
import { getImageProduct } from '../../api/product'

export default function ListProduct(props) {

    const { products } = props;

    const navigation = useNavigation();

    const goToProduct = (id) => {
        navigation.push("product", { idProduct: id })
    }

    useEffect(() => {
        (async () => {

            //console.log(products);

            // const product_image = await getImageProduct(products.product_id);
            // setImage(product_image);

        })();
    }, []);

    return (
        <View style={styles.container}>
            {map(products, (product) => (

                <TouchableWithoutFeedback
                    key={product.product_id}
                    onPress={() => goToProduct(product.product_id)}
                >
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `http://amantoli.com.mx/storage/${product.category_image}`,
                                }}
                            />
                            <Text
                                style={styles.name}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {product.product_name}
                            </Text>
                            <Text style={styles.price}>$MXN {product.product_price}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    containerProduct: {
        width: "50%",
        //padding: 5,
    },
    product: {
        margin: 5,
        borderWidth: 1,
        borderColor: colors.bgwhite,
        backgroundColor: colors.bgwhite,
        padding: 8,
        borderRadius: 5,
        elevation: 2
    },
    image: {
        height: 140,
        resizeMode: "contain"
    },
    price: {
        //fontWeight: "bold",
        fontSize: 16,
        color: colors.fontBlack
    },
    name: {
        marginTop: 15,
        fontSize: 14,
        color: colors.fontPrice
    },
})