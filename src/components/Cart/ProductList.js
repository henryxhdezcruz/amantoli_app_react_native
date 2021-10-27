import React, { useEffect } from "react";
import { StyleSheet, View, Text} from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import { getProductApi } from "../../api/product";
import Product from "../../components/Cart/Product";

export default function ProductList(props) {
    const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;
    console.log(cart);
    // useEffect(() => {
    //     setProducts(null);
    //     (async () => {

    //         const productTemp = [];
    //         let totalPaymentTemp = 0;

    //         for await (const product of cart) {
    //             const response = await getProductApi(product.idProduct);
    //             response.quantity = product.quantity;
    //             productTemp.push(response);

    //             const price = calcPrice(response.price, response.discount);

    //             totalPaymentTemp += price * response.quantity;
    //         }

    //         setProducts(productTemp);
    //         setTotalPayment(totalPaymentTemp.toFixed(2));
    //     })();
    // }, [cart]);

    // return (
    //     <View>
    //         <Text style={styles.title}>LISTADO DE PRODUCTOS</Text>
    //         {!products ? (
    //             <ScreenLoading size="large" text="Cargando carrito" />
    //         ) : (
    //             map(products, (product) => <Product key={product._id} product={product} setReloadCart={setReloadCart} />)
    //         )}
    //     </View>
    // )
}

function calcPrice(price, discount) {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
    },
});