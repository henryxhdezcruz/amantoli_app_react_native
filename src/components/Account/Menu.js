import React from 'react'
import { Alert } from 'react-native'
import { List } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import useAuth from "../../hooks/useAuth"
import colors from '../../styles/colors'

export default function Menu() {

    const navigation = useNavigation();
    const { logout } = useAuth();

    const logoutAccount = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres salir de tu cuenta?",
            [
                {
                    text: "No"
                },
                {
                    text: "Si",
                    onPress: logout
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <>
            <List.Section>
                <List.Subheader>Mi cuenta</List.Subheader>
                <List.Item
                    title="Actualice su nombre"
                    description="Actualice su nombre de cuenta de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="face" />}
                    onPress={() => navigation.navigate("change-name")}
                />
                <List.Item
                    title="Actualice su correo electrónico"
                    description="Actualice el correo electrónico de su cuenta"
                    left={(props) => <List.Icon {...props} icon="at" />}
                    onPress={() => navigation.navigate("change-email")}
                />
                <List.Item
                    title="Actualice su contraseña"
                    description="Actualice la contraseña de su cuenta"
                    left={(props) => <List.Icon {...props} icon="key" />}
                    onPress={() => navigation.navigate("change-password")}
                />
                <List.Item
                    title="Mis direcciones"
                    description="Administra tus direcciones de envio"
                    left={(props) => <List.Icon {...props} icon="map" />}
                    onPress={() => navigation.navigate("addresses")}
                />
            </List.Section>
            <List.Section>
                <List.Subheader >App</List.Subheader>
                <List.Item
                    title="Pedidos"
                    description="Historial de pedidos"
                    left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                    onPress={() => navigation.navigate("orders")}
                />
                <List.Item
                    title="Lista de deseos"
                    description="Productos que te gustaron"
                    left={(props) => <List.Icon {...props} icon="heart" />}
                    onPress={() => navigation.navigate("favorites")}
                />
                <List.Item
                    title="Cerrar sesión"
                    description="Cerrar la sesión e inicia con otra"
                    left={(props) => <List.Icon {...props} icon="logout" />}
                    onPress={logoutAccount}
                />
            </List.Section>
        </>
    )
}