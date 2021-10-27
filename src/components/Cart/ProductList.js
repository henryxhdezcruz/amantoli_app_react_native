import React, { useEffect } from "react";
import { StyleSheet, View, Text} from "react-native";
import { map, toInteger } from "lodash";
import ScreenLoading from "../ScreenLoading";
import { getProductApi } from "../../api/product";
import Product from "../../components/Cart/Product";

export default function ProductList(props) {
    const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

    useEffect(() => {
        setProducts(null);
        (async () => {

            const productTemp = [];
            var totalPaymentTemp = 0;

            for await (const product of cart) {
                const response = await getProductApi(product.id_product);
                //response.quantity = product.quantity;
                productTemp.push(response);

                const price = parseFloat(response.product_price);
                //const price = calcPrice(response.price, response.discount);

                totalPaymentTemp += price * parseInt(product.quantity);
            }
            setProducts(productTemp);
            setTotalPayment(totalPaymentTemp.toFixed(2));
        })();
    }, [cart]);

    return (
        <View>
            <Text style={styles.title}>LISTADO DE PRODUCTOS</Text>
            {!products ? (
                <ScreenLoading size="large" />
            ) : (
                map(products, (product) => <Product key={product.product_id} product={product} setReloadCart={setReloadCart} />)
            )}
        </View>
    )
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