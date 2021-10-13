import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
//import Toast from 'react-native-root-toast';
//import Toast  from  'react-native-toast-message' ;
import { useToast } from 'react-native-fast-toast'
import { addProductCartApi } from '../../api/cart';
import { Icon } from 'react-native-elements'
import colors from '../../styles/colors';

export default function Buy(props) {

    const { product, quantity } = props;

    const toast = useToast();

    const addProductCart = async () => {
        const response = await addProductCartApi(product._id, quantity);
        if (response) {
            toast.show("Producto añadido al carrito", {
                position: 'top',
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
            });
        } else {
            toast.show("ERROR al añadir el producto al carrito", {
                position: 'top',
                duration: 4000,
                offset: 40,
                animationType: 'zoom-in',
            });
        }
    };

    return (
        <View style={{ zIndex: 1 }}>
            <Button
                mode="contained"
                contentStyle={styles.btnBuyContent}
                labelStyle={styles.btnLabel}
                style={styles.btn}
                onPress={addProductCart}
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