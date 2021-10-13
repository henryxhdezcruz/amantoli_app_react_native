import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native'
import StatusBar from "../../components/StatusBar"
import Search from "../../components/Search"
import ScreenLoading from "../../components/ScreenLoading"
import { getProductApi, getColorProduct, getSizeProduct, getColorSizeProduct, getImageProduct } from "../../api/product"
import CarouselImage from '../../components/Product/CarouselImage'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import SizeColor from '../../components/Product/SizeColor'
import Colors from '../../components/Product/Colors'
import Buy from "../../components/Product/Buy"
import Favorite from '../../components/Product/Favorite'
import RelatedProducts from '../../components/Product/RelatedProducts'
import { map } from "lodash";
import { Button } from 'react-native-paper'
const split = require('split-string');
import colors from '../../styles/colors'
import { Icon } from 'react-native-elements'

export default function Product(props) {

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const { route } = props;

    const { params } = route;

    const [product, setProduct] = useState(null);

    const [productColors, setProductColors] = useState(null);

    const [sizeColors, setSizeColors] = useState(null);

    const [images, setImages] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [refreshing, setRefreshing] = useState(false);


    var today = new Date();
    const number = today.getDate() + 7;
    const month = today.getMonth();

    var date = new Date(2021, month, number);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        setProduct(null);
        (async () => {
            const response = await getProductApi(params.idProduct);
            setProduct(response);
            const ColorProducts = await getColorProduct(params.idProduct);
            const SizeProducts = await getSizeProduct(params.idProduct);

            const ImageProduct = getImageProduct(params.idProduct);
            //console.log("No lo se bro" + ImageProduct);
            setImages(ImageProduct);

            if (ColorProducts.length === 0) {
                setSizeColors(SizeProducts);
            } else {
                setProductColors(ColorProducts);
            }

            //console.log(ColorProducts);
            //ColorProducts.forEach(color => console.log(color.id));


            //console.log(SizeProducts);
            //const ColorSizeProduct = await getColorSizeProduct();


            //SizeProducts.forEach(color => console.log(color.id));
            // const arrayImages = [response.main_image];
            // arrayImages.push(...response.images);
            // setImages(arrayImages);
        })();
    }, [params]);

    return (
        <>
            <StatusBar />
            <Search />
            {!product ? (
                <ScreenLoading text="Cargando..." size="large" />
            ) : (
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={styles.title}>{product.product_name}</Text>
                    {/* <CarouselImage images={images} /> */}
                    <View style={styles.containerView}>
                        <Text style={styles.textTitle}>Marca: {product.brand_name}</Text>
                        <Price price={product.product_price} discount={product.discount} />
                        <View style={[styles.row, styles.center, styles.time]}>
                            <View>
                                <Icon
                                    raised
                                    name='truck'
                                    type='font-awesome'
                                    color={colors.lime}
                                    reverse
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, color: colors.lime, margin: 5 }}>Se hacen envíos a todo México</Text>
                                <Text style={[styles.textDetails, { margin: 5 }]}>Recíbelo el  {date.toDateString()}</Text>
                            </View>
                        </View>

                        <SizeColor sizeColors={sizeColors} setSizeColors={setSizeColors} />

                        <View style={[styles.row, styles.center]}>
                            <Text style={styles.textTitle}>Color: </Text>
                            <View>
                                <Colors productColors={productColors} setProductColors={setProductColors} />
                            </View>
                        </View>
                        <View style={styles.qtyBuy}>
                            <Text style={styles.textDetails}>Stock Disponible: 50</Text>
                            <View style={[styles.row, styles.center]}>
                                <View style={{ width: "25%" }}>
                                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                                </View>
                                <View style={styles.addcart}>
                                    <Buy product={product} quantity={quantity} />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, styles.center]}>
                            <Favorite product={product} />
                        </View>
                        <View style={[styles.viewDetails]}>
                            <Text style={styles.textTitle}>Descripción</Text>
                            <Text style={styles.textDetails}>{product.product_description}</Text>
                        </View>
                        <ScrollView horizontal>
                        </ScrollView>
                    </View>
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
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        padding: 10,
    },
    containerView: {
        padding: 10,
        paddingBottom: 40
    },
    row: {
        marginTop: 10,
        flexDirection: "row",
    },
    addcart: {
        marginLeft: 20,
        width: "65%"
    },
    center: {
        alignItems: "center",
        alignSelf: "center",
    },
    textDetails: {
        fontSize: 16,
        color: colors.fontPrice,
    },
    viewDetails: {
        borderWidth: 1,
        borderColor: colors.bgGray,
        marginTop: 15,
        padding: 10
    },
    textTitle: {
        fontSize: 18,
        marginBottom: 5
    },
    qtyBuy: {
        marginTop: 15
    },
    time: {
        borderRadius: 5,
        elevation: 3,
        padding: 10,
        backgroundColor: colors.bgwhite,
        width: "100%",
        marginVertical: 10
    }
})
