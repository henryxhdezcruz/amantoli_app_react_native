import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, ScrollView, RefreshControl, useWindowDimensions, Image } from 'react-native'
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
import RenderHtml from 'react-native-render-html';

export default function Product(props) {

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const { width } = useWindowDimensions();
    const { route } = props;
    const { params } = route;

    const [product, setProduct] = useState(null);
    const [productColors, setProductColors] = useState(null);
    const [productSize, setProductSize] = useState(null);
    const [productSizeColor, setProductSizeColor] = useState(null);

    const [isSelectedQuantity, setSelectionQuantity] = useState(null);
    const [isSelectedSize, setSelectionSize] = useState(null);
    const [isSelectedSizeColor, setSelectionSizeColor] = useState(null);
    const [isSelectedColor, setSelectionColor] = useState(null);

    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(0);

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

    function countQuantity(arr) {
        cantidad = 0;
        arr.forEach(count => {
            cantidad += parseInt(count);
        });
        return cantidad;
    }

    useEffect(() => {
        setProduct(null);
        (async () => {
            const response = await getProductApi(params.idProduct);
            setProduct(response);
            const ColorProducts = await getColorProduct(params.idProduct);
            const SizeProducts = await getSizeProduct(params.idProduct);

            if (ColorProducts.length > 0) {
                setProductColors(ColorProducts);
                setQuantity(countQuantity(map(ColorProducts, "quantity")));
            }

            if (SizeProducts.length > 0) {
                setProductSize(SizeProducts);
                const temp = map(SizeProducts, "id");

                var arrSizeColor = [];
                for (let index = 0; index < temp.length; index++) {
                    const ColorSize = await getColorSizeProduct(temp[index]);
                    arrSizeColor = arrSizeColor.concat(ColorSize);
                }
                setQuantity(countQuantity(map(arrSizeColor, "quantity")));
                setProductSizeColor(arrSizeColor);
            }

            if(quantity == 0) {
                if (parseInt(response.product_quantity) > 0) (setQuantity(response.product_quantity));
            }
            
            const ImageProduct = await getImageProduct(params.idProduct);
            setImages(ImageProduct);
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
                    <CarouselImage images={images} />
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

                        {
                            productSize != null ? (
                                <SizeColor setQuantity={setQuantity} setSelectionSizeColor={setSelectionSizeColor} setSelectionSize={setSelectionSize} productSize={productSize}/>
                            ) : (
                                <Text/>
                            )                            
                        }

                        {
                            productColors != null ? (
                                <View style={[styles.row, styles.center]}>
                                    <Text>Color:  </Text>
                                    <View>
                                        <Colors setSelectionColor={setSelectionColor} productColors={productColors}/>
                                    </View>
                                </View>
                            ):(
                                <Text/>
                            )
                        }

                        <View style={styles.qtyBuy}>
                            <Text>Stock Disponible: {quantity}</Text>
                            <View style={[styles.row, styles.center]}>
                                <View style={{ width: "25%" }}>
                                    <Quantity setSelectionQuantity={setSelectionQuantity} stock={quantity} />
                                </View>
                                <View style={styles.addcart}>
                                    <Buy quantity={quantity} product={product} isSelectedQuantity={isSelectedQuantity} isSelectedColor={isSelectedColor} isSelectedSize={isSelectedSize} isSelectedSizeColor={isSelectedSizeColor}/>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row, styles.center]}>
                            <Favorite product={product} />
                        </View>
                        <View style={[styles.viewDetails]}>
                            <Text style={styles.textTitle}>Descripción</Text>
                            <RenderHtml
                                contentWidth={width}
                                source={{html:product.product_description}}
                            />
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
    viewDetails: {
        borderWidth: 1,
        borderColor: colors.bgGray,
        marginTop: 15,
        padding: 10,
        borderRadius: 5
    },
    textTitle: {
        fontSize: 18,
        marginBottom: 2
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
    },
})
