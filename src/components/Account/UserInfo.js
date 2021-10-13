import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function UserInfo(props) {

    const { user } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.titleName}>
                {user.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 18,
    },
    titleName: {
        fontWeight: "bold",
        fontSize: 20,
    }
})