import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, Text, ActivityIndicator,} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBar from "../components/StatusBar";
import NotProducts from "../components/Cart/NotProducts";
import ProductList from "../components/Cart/ProductList";
import AddressList from "../components/Cart/AddressList";
import Paypal from "../components/Cart/PayPal";
import Payment from "../components/Cart/Payment";
import { read_shopping_cart } from "../api/cart";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import colors from "../styles/colors";

export default function Cart() {

    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { auth } = useAuth();

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            setAddresses(null);
            setSelectedAddress(null);
            loadCart();
            loadAddresses();
        }, [])
    );

    useEffect(() => {
        if(reloadCart) {
            loadCart();
            setReloadCart(false);
        }
    }, [reloadCart])

    const loadCart = async () => {
        const response = await read_shopping_cart(auth);
        setCart(response);
    };

    const loadAddresses = async () => {
      const response = await getAddressesApi(auth);
      setAddresses(response);
    };

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            {!cart || size(cart) === 0 ? (
                <>
                    <NotProducts/>
                </>
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25}>
                    <ScrollView style={styles.cartContainer}>

                        <Text style={styles.containerTitle}>PRODUCTOS EN CARRITO</Text>
                        
                        <ProductList
                            cart={cart}
                            products={products}
                            setProducts={setProducts}
                            setReloadCart={setReloadCart}
                            setTotalPayment={setTotalPayment}
                        />

                        <Text style={styles.containerTitle}>DETALLES DE LA DIRECCI??N DE ENV??O</Text>
                        
                        <AddressList
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />

                        <Text style={styles.containerTitle}>ELIGE TU FORMA DE PAGO</Text>

                        <Payment
                        totalPayment={totalPayment}
                        products={products}
                        selectedAddress={selectedAddress}
                        />
                        
                        <Paypal></Paypal>
                    </ScrollView>
                </KeyboardAwareScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        padding: 10,
    },
    reload: {
        backgroundColor: "#000",
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.3,
        alignItems: "center",
        justifyContent: "center",
    },
    containerTitle: {
        paddingVertical: 10,
        fontSize: 17,
        fontWeight: "bold"
    },
});
  