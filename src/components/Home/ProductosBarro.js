import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getProductForCategory } from '../../api/product'
import ListProduct from './ListProduct';
import { useNavigation } from "@react-navigation/native";
import colors from '../../styles/colors';

export default function ProductosBarro() {

    const navigation = useNavigation();

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getProductForCategory("Productos de barro");
            setProducts(response);
        })();
    }, []);

    const goToCategory = () => {
        navigation.push("category", { category_name: "Productos de barro" })
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>PRODUCTOS DE BARRO</Text>
                <TouchableOpacity onPress={goToCategory}>
                    <Text style={styles.details}>Ver más...</Text>
                </TouchableOpacity>
            </View>
            {products && <ListProduct products={products} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //margin: 10,
        marginTop: 10,
        paddingBottom: 10,
        //backgroundColor: colors.bgwhite,
        borderRadius: 5,
        padding: 10,
    },
    title: {
        paddingLeft: 5,
        fontSize: 18,
        paddingBottom: 10,
    },
    details: {
        marginLeft: 10,
        fontSize: 18,
        paddingBottom: 10,
        color: colors.primary,
    },

})