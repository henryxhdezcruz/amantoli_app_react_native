import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { size } from "lodash";
import useAuth from "../../hooks/useAuth";
import { useToast } from 'react-native-fast-toast'
import {
    addFavoriteApi,
    isFavoriteApi,
    deleteFavoriteApi,
} from "../../api/favorite";
import colors from "../../styles/colors";

export default function Favorite(props) {

    const { product } = props;

    const [isFavorite, setIsFavorite] = useState(undefined);

    const [loading, setLoading] = useState(false);

    const { auth } = useAuth();

    const toast = useToast();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product.product_id);
            if (response.status == false) setIsFavorite(false);
            else setIsFavorite(true);
        })();
    }, [product]);

    const addFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await addFavoriteApi(auth, product.product_id);
                setIsFavorite(true);
                toast.show("Producto añadido a favoritos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    const deleteFavorite = async () => {
        if (!loading) {
            setLoading(true);
            try {
                await deleteFavoriteApi(auth, product.product_id);
                setIsFavorite(false);
                toast.show("Producto eliminado de favoritos", {
                    duration: 4000,
                    offset: 40,
                    animationType: 'zoom-in',
                });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    }

    if (isFavorite === undefined) return null;

    return (
        <View style={{ zIndex: 1 }} >
            <View style={styles.row}>
                <Icon
                    raised
                    //size={25}
                    name='heart'
                    type='ionicon'
                    color={isFavorite ? colors.bgHeart : colors.bgGray}
                    onPress={isFavorite ? deleteFavorite : addFavorite}
                    disabled={loading}
                />
                <Text style={styles.textDetails}>{isFavorite ? " Eliminar de favoritos" : " Añadir a favoritos"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    textDetails: {
        fontSize: 16,
        color: colors.fontPrice,
    },
})