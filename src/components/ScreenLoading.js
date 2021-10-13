import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import colors from '../styles/colors';

export default function ScreenLoading(props) {

    const { text, size, color } = props;

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={50} color={colors.primary} style={styles.loading} />
            <Text style={styles.title}>Cargando...</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        color: colors.fontBlack,
    }
})

ScreenLoading.defaultProps = {
    text: 'Loading...',
}