import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../styles/colors';

export default function Price(props) {

    const { price, discount } = props;

    const calcPrice = (price, discount) => {
        if (!discount) return price;

        const discountAmout = (price * discount) / 100;
        return (price - discountAmout).toFixed(2)
    }

    return (
        <View>
            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Precio recomendado: </Text>
                    <Text style={[styles.dataValue, styles.oldPrice]}>$MXN {price}</Text>
                </View>
            )}

            <View style={styles.containerData}>
                <Text style={styles.dataText}>Precio: </Text>
                <Text style={[styles.dataValue, styles.currentPrice]}>$MXN {calcPrice(price, discount)}</Text>
            </View>

            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Ahorras: </Text>
                    <Text style={[styles.dataValue, styles.saving]}>$MXN {((price * discount) / 100).toFixed(2)} ({discount}%)</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    dataText: {
        width: "45%",
        fontSize: 16,
        color: colors.fontPrice,
        textAlign: "right"
    },
    dataValue: {
        width: "55%",
        fontSize: 18,
        paddingLeft: 5
    },
    containerData: {
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    oldPrice: {
        textDecorationLine: "line-through",
        color: colors.fontBlack
    },
    currentPrice: {
        fontSize: 23,
        color: colors.fontBlack
    },
    saving: {
        color: colors.fontBlack
    }
})