import React from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Button } from "react-native-paper"
import { map } from "lodash"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import { deleteAddressApi } from "../../api/address"
import colors from "../../styles/colors"
import { Icon } from 'react-native-elements'

export default function AddressList(props) {

    const { addresses, setReloadAddress } = props;

    const { auth } = useAuth();

    const navigation = useNavigation();

    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminando dirección",
            `¿Estás seguro que deseas eliminar la dirección ${address.title}?`,
            [
                {
                    text: "No"
                },
                {
                    text: "Si",
                    onPress: () => deleteAddress(address.id)
                }
            ],
            { cancelable: false }
        );
    };

    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress);
            setReloadAddress(true);
        } catch (error) {
            console.log(error);
        }
    }

    const goToUpdateAddress = (idAddress) => {
        navigation.navigate("add-address", { idAddress });
    }

    return (
        <View style={styles.container}>
            {map(addresses, (address) => (
                <View key={address.id} style={styles.address} >
                    <TouchableOpacity onPress={() => goToUpdateAddress(address.id)}>
                        <View style={styles.containTitle}>
                            <Text style={styles.title}>{address.title}</Text>
                        </View>
                        <View style={styles.containData}>
                            <Text>{address.name}</Text>
                            <Text>{address.country}</Text>
                            <View style={styles.blockLine}>
                                <Text>{address.state}, </Text>
                                <Text>{address.city}, </Text>
                                <Text>{address.postal_code}</Text>
                            </View>
                            <Text>Numero de telefono: {address.phone}</Text>
                            <Text>Detalles extra: {address.references}</Text>

                            <View style={styles.actions}>
                                <Button
                                    mode="contained"
                                    contentStyle={styles.btnContent}
                                    labelStyle={styles.btnText}
                                    onPress={() => goToUpdateAddress(address.id)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    mode="contained"
                                    color={colors.fontBlack}
                                    style={{ paddingVertical: 4 }}
                                    labelStyle={styles.btnText}
                                    onPress={() => deleteAddressAlert(address)}
                                >
                                    Eliminar
                                </Button>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom: 20,
    },
    address: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.bgGray,
        marginBottom: 15,
    },
    title: {
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    blockLine: {
        flexDirection: "row"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    btnContent: {
        paddingVertical: 4,
        backgroundColor: colors.primary,
    },
    containTitle: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.bgGray,
        padding: 10,
        // marginBottom: 10,
        backgroundColor: colors.bgGray,
        alignContent: "center"
    },
    containData: {
        padding: 10
    },
    Directions: {
        color: colors.dark,
        fontSize: 16,
        paddingBottom: 10
    }
})