import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-fast-toast'
import { add_product_shopping_cart } from '../../api/cart';
import { Icon } from 'react-native-elements'
import colors from '../../styles/colors';
import useAuth from '../../hooks/useAuth';

export default function Buy(props) {

    const { quantity, product, isSelectedQuantity, isSelectedColor, isSelectedSize, isSelectedSizeColor } = props;

    const toast = useToast();

    const { auth } = useAuth();

    const addProductCart = async () => {
        toast.show("Producto " + product.product_id + " cantidad " + isSelectedQuantity + " color " + isSelectedColor + " talla " + isSelectedSize + " tallacolor " + isSelectedSizeColor , {
                    position: 'top',
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
        const response = await add_product_shopping_cart(auth, product.product_id, isSelectedSize, isSelectedSizeColor, isSelectedColor, isSelectedQuantity);
        console.log(response);
        // if (response) {
        //     toast.show("Producto añadido al carrito", {
        //         position: 'top',
        //         duration: 4000,
        //         offset: 40,
        //         animationType: 'zoom-in',
        //     });
        // } else {
        //     toast.show("ERROR al añadir el producto al carrito", {
        //         position: 'top',
        //         duration: 4000,
        //         offset: 40,
        //         animationType: 'zoom-in',
        //     });
        // }
    };

    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={styles.btnBuyContent}
                labelStyle={styles.btnLabel}
                onPress={addProductCart}
                disabled={parseInt(quantity) == 0 ? true : false }
            >
                Agregar al carrito
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBuyContent: {
        backgroundColor: colors.primary,
    },
    btnLabel: {
        fontSize: 16,
    },
    // btn: {
    //     marginTop: 20
    // }
})