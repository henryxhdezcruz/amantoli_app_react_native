import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, ScrollView, RefreshControl, Image, Dimensions } from 'react-native'
import StatusBar from "../../components/StatusBar"
import Search from "../../components/Search"
import ScreenLoading from "../../components/ScreenLoading"
import { getCategoryApi, getCategoryImage } from "../../api/category"
import colors from '../../styles/colors'
import ListProduct from "../Home/ListProduct"

const width = Dimensions.get("window").width - 20;

export default function Category(props) {

    const {
        route: { params },
    } = props;

    const [products, setProducts] = useState(null);
    const [image, setImage] = useState(null);

    const URL = "http://amantoli.com.mx/storage/";

    useEffect(() => {
        setProducts(null);
        (async () => {
            const category_image = await getCategoryImage(params.category_name);
            setImage(category_image);

            const response = await getCategoryApi(params.category_name);
            setProducts(response);
        })();
    }, [params]);

    return (
        <>
            <StatusBar />
            <Search />
            {!products ? (
                <ScreenLoading text="Cargando..." size="large" />
            ) : (
                <ScrollView style={styles.container}>
                    <View style={styles.imageCategory}>
                        <Image style={styles.image}
                            source={{
                                uri: `http://amantoli.com.mx/storage/${image.image}`,
                            }}
                        />
                    </View>
                    <Text style={[styles.title, styles.titlecategory]}>{image.name.toUpperCase()}</Text>
                    <ListProduct products={products} />
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        padding: 10,
    },
    containerView: {
        padding: 10,
        paddingBottom: 40
    },
    titlecategory: {
        borderRadius: 5,
        elevation: 3,
        padding: 10,
        backgroundColor: colors.bgwhite,
        //width: "100%",
        marginVertical: 10,
        marginHorizontal: 5
    },
    imageCategory: {
        position: "relative",
        backgroundColor: colors.bgwhite,
        margin: 5,
        //borderRadius: 5,
        //elevation: 5
    },
    image: {
        width,
        height: 200,
        borderRadius: 5,
    },
})
